import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ɵreverseDeepMerge as reverseDeepMerge, ɵgetFieldValue as getFieldValue, ɵclone as clone, ɵhasKey as hasKey, } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
// https://stackoverflow.com/a/27865285
function decimalPlaces(a) {
    if (!isFinite(a)) {
        return 0;
    }
    let e = 1, p = 0;
    while (Math.round(a * e) / e !== a) {
        e *= 10;
        p++;
    }
    return p;
}
function isEmpty(v) {
    return v === '' || v == null;
}
function isObject(v) {
    return v != null && typeof v === 'object' && !Array.isArray(v);
}
function isInteger(value) {
    return Number.isInteger ? Number.isInteger(value) : typeof value === 'number' && Math.floor(value) === value;
}
function isConst(schema) {
    return typeof schema === 'object' && (schema.hasOwnProperty('const') || (schema.enum && schema.enum.length === 1));
}
function totalMatchedFields(field) {
    if (!field.fieldGroup) {
        return hasKey(field) && getFieldValue(field) !== undefined ? 1 : 0;
    }
    const total = field.fieldGroup.reduce((s, f) => totalMatchedFields(f) + s, 0);
    if (total === 0 && hasKey(field)) {
        const value = getFieldValue(field);
        if (value === null ||
            (value !== undefined && ((field.fieldArray && Array.isArray(value)) || (!field.fieldArray && isObject(value))))) {
            return 1;
        }
    }
    return total;
}
export class FormlyJsonschema {
    toFieldConfig(schema, options) {
        schema = clone(schema);
        return this._toFieldConfig(schema, { schema, ...(options || {}) });
    }
    _toFieldConfig(schema, { key, ...options }) {
        schema = this.resolveSchema(schema, options);
        const types = this.guessSchemaType(schema);
        let field = {
            type: types[0],
            defaultValue: schema.default,
            props: {
                label: schema.title,
                readonly: schema.readOnly,
                description: schema.description,
            },
        };
        if (key != null) {
            field.key = key;
        }
        if (!options.ignoreDefault && (schema.readOnly || options.readOnly)) {
            field.props.disabled = true;
            options = { ...options, readOnly: true };
        }
        if (options.resetOnHide) {
            field.resetOnHide = true;
        }
        if (key && options.strict) {
            this.addValidator(field, 'type', (c, f) => {
                const value = getFieldValue(f);
                if (value != null) {
                    switch (field.type) {
                        case 'string': {
                            return typeof value === 'string';
                        }
                        case 'integer': {
                            return isInteger(value);
                        }
                        case 'number': {
                            return typeof value === 'number';
                        }
                        case 'object': {
                            return isObject(value);
                        }
                        case 'array': {
                            return Array.isArray(value);
                        }
                    }
                }
                return true;
            });
        }
        if (options.shareFormControl === false) {
            field.shareFormControl = false;
        }
        if (options.ignoreDefault) {
            delete field.defaultValue;
        }
        this.addValidator(field, 'type', {
            schemaType: types,
            expression: ({ value }) => {
                if (value === undefined) {
                    return true;
                }
                if (value === null && types.indexOf('null') !== -1) {
                    return true;
                }
                switch (types[0]) {
                    case 'null': {
                        return typeof value === null;
                    }
                    case 'string': {
                        return typeof value === 'string';
                    }
                    case 'integer': {
                        return isInteger(value);
                    }
                    case 'number': {
                        return typeof value === 'number';
                    }
                    case 'object': {
                        return isObject(value);
                    }
                    case 'array': {
                        return Array.isArray(value);
                    }
                }
                return true;
            },
        });
        switch (field.type) {
            case 'number':
            case 'integer': {
                field.parsers = [(v) => (isEmpty(v) ? v : Number(v))];
                if (schema.hasOwnProperty('minimum')) {
                    field.props.min = schema.minimum;
                }
                if (schema.hasOwnProperty('maximum')) {
                    field.props.max = schema.maximum;
                }
                if (schema.hasOwnProperty('exclusiveMinimum')) {
                    field.props.exclusiveMinimum = schema.exclusiveMinimum;
                    this.addValidator(field, 'exclusiveMinimum', ({ value }) => isEmpty(value) || value > schema.exclusiveMinimum);
                }
                if (schema.hasOwnProperty('exclusiveMaximum')) {
                    field.props.exclusiveMaximum = schema.exclusiveMaximum;
                    this.addValidator(field, 'exclusiveMaximum', ({ value }) => isEmpty(value) || value < schema.exclusiveMaximum);
                }
                if (schema.hasOwnProperty('multipleOf')) {
                    field.props.step = schema.multipleOf;
                    this.addValidator(field, 'multipleOf', ({ value }) => {
                        if (isEmpty(value) || typeof value !== 'number' || value === 0 || schema.multipleOf <= 0) {
                            return true;
                        }
                        // https://github.com/ajv-validator/ajv/issues/652#issue-283610859
                        const multiplier = Math.pow(10, decimalPlaces(schema.multipleOf));
                        return Math.round(value * multiplier) % Math.round(schema.multipleOf * multiplier) === 0;
                    });
                }
                break;
            }
            case 'string': {
                field.parsers = [
                    (v) => {
                        if (types.indexOf('null') !== -1) {
                            v = isEmpty(v) ? null : v;
                        }
                        else if (!field.props.required) {
                            v = v === '' ? undefined : v;
                        }
                        return v;
                    },
                ];
                ['minLength', 'maxLength', 'pattern'].forEach((prop) => {
                    if (schema.hasOwnProperty(prop)) {
                        field.props[prop] = schema[prop];
                    }
                });
                break;
            }
            case 'object': {
                if (!field.fieldGroup) {
                    field.fieldGroup = [];
                }
                const { propDeps, schemaDeps } = this.resolveDependencies(schema);
                Object.keys(schema.properties || {}).forEach((property) => {
                    const isRequired = Array.isArray(schema.required) && schema.required.indexOf(property) !== -1;
                    const f = this._toFieldConfig(schema.properties[property], {
                        ...options,
                        key: property,
                        isOptional: options.isOptional || !isRequired,
                    });
                    field.fieldGroup.push(f);
                    if (isRequired || propDeps[property]) {
                        f.expressions = {
                            ...(f.expressions || {}),
                            'props.required': (f) => {
                                let parent = f.parent;
                                const model = f.fieldGroup && f.key != null ? parent.model : f.model;
                                while (parent.key == null && parent.parent) {
                                    parent = parent.parent;
                                }
                                const required = parent && parent.props ? parent.props.required : false;
                                if (!model && !required) {
                                    return false;
                                }
                                if (Array.isArray(schema.required) && schema.required.indexOf(property) !== -1) {
                                    return true;
                                }
                                return propDeps[property] && f.model && propDeps[property].some((k) => !isEmpty(f.model[k]));
                            },
                        };
                    }
                    if (schemaDeps[property]) {
                        const getConstValue = (s) => {
                            return s.hasOwnProperty('const') ? s.const : s.enum[0];
                        };
                        const oneOfSchema = schemaDeps[property].oneOf;
                        if (oneOfSchema &&
                            oneOfSchema.every((o) => o.properties && o.properties[property] && isConst(o.properties[property]))) {
                            oneOfSchema.forEach((oneOfSchemaItem) => {
                                const { [property]: constSchema, ...properties } = oneOfSchemaItem.properties;
                                field.fieldGroup.push({
                                    ...this._toFieldConfig({ ...oneOfSchemaItem, properties }, { ...options, shareFormControl: false, resetOnHide: true }),
                                    expressions: {
                                        hide: (f) => !f.model || getConstValue(constSchema) !== f.model[property],
                                    },
                                });
                            });
                        }
                        else {
                            field.fieldGroup.push({
                                ...this._toFieldConfig(schemaDeps[property], options),
                                expressions: {
                                    hide: (f) => !f.model || isEmpty(f.model[property]),
                                },
                            });
                        }
                    }
                });
                if (schema.oneOf) {
                    field.fieldGroup.push(this.resolveMultiSchema('oneOf', schema.oneOf, { ...options, shareFormControl: false }));
                }
                if (schema.anyOf) {
                    field.fieldGroup.push(this.resolveMultiSchema('anyOf', schema.anyOf, options));
                }
                break;
            }
            case 'array': {
                if (schema.hasOwnProperty('minItems')) {
                    field.props.minItems = schema.minItems;
                    this.addValidator(field, 'minItems', (c, f) => {
                        const value = getFieldValue(f);
                        return isEmpty(value) || value.length >= schema.minItems;
                    });
                    if (!options.isOptional && schema.minItems > 0 && field.defaultValue === undefined) {
                        field.defaultValue = Array.from(new Array(schema.minItems));
                    }
                }
                if (schema.hasOwnProperty('maxItems')) {
                    field.props.maxItems = schema.maxItems;
                    this.addValidator(field, 'maxItems', (c, f) => {
                        const value = getFieldValue(f);
                        return isEmpty(value) || value.length <= schema.maxItems;
                    });
                }
                if (schema.hasOwnProperty('uniqueItems')) {
                    field.props.uniqueItems = schema.uniqueItems;
                    this.addValidator(field, 'uniqueItems', (c, f) => {
                        const value = getFieldValue(f);
                        if (isEmpty(value) || !schema.uniqueItems) {
                            return true;
                        }
                        const uniqueItems = Array.from(new Set(value.map((v) => JSON.stringify(v, (k, o) => {
                            if (isObject(o)) {
                                return Object.keys(o)
                                    .sort()
                                    .reduce((obj, key) => {
                                    obj[key] = o[key];
                                    return obj;
                                }, {});
                            }
                            return o;
                        }))));
                        return uniqueItems.length === value.length;
                    });
                }
                // resolve items schema needed for isEnum check
                if (schema.items && !Array.isArray(schema.items)) {
                    schema.items = this.resolveSchema(schema.items, options);
                }
                // TODO: remove isEnum check once adding an option to skip extension
                if (!this.isEnum(schema)) {
                    field.fieldArray = (root) => {
                        const items = schema.items;
                        if (!Array.isArray(items)) {
                            if (!items) {
                                return {};
                            }
                            const isMultiSchema = items.oneOf || items.anyOf;
                            // When items is a single schema, the additionalItems keyword is meaningless, and it should not be used.
                            const f = this._toFieldConfig(items, isMultiSchema ? { ...options, key: `${root.fieldGroup.length}` } : options);
                            if (isMultiSchema && !hasKey(f)) {
                                f.key = null;
                            }
                            f.props.required = true;
                            return f;
                        }
                        const length = root.fieldGroup ? root.fieldGroup.length : 0;
                        const itemSchema = items[length] ? items[length] : schema.additionalItems;
                        const f = itemSchema ? this._toFieldConfig(itemSchema, options) : {};
                        if (f.props) {
                            f.props.required = true;
                        }
                        if (items[length]) {
                            f.props.removable = false;
                        }
                        return f;
                    };
                }
                break;
            }
        }
        if (schema.hasOwnProperty('const')) {
            field.props.const = schema.const;
            this.addValidator(field, 'const', ({ value }) => value === schema.const);
            if (!field.type) {
                field.defaultValue = schema.const;
            }
        }
        if (this.isEnum(schema)) {
            const enumOptions = this.toEnumOptions(schema);
            const multiple = field.type === 'array';
            field.type = 'enum';
            field.props.multiple = multiple;
            field.props.options = enumOptions;
            const enumValues = enumOptions.map((o) => o.value);
            this.addValidator(field, 'enum', ({ value }) => {
                if (value === undefined) {
                    return true;
                }
                if (multiple) {
                    return Array.isArray(value) ? value.every((o) => enumValues.includes(o)) : false;
                }
                return enumValues.includes(value);
            });
        }
        if (schema.oneOf && !field.type) {
            delete field.key;
            field.fieldGroup = [
                this.resolveMultiSchema('oneOf', schema.oneOf, { ...options, key, shareFormControl: false }),
            ];
        }
        if (schema.oneOf && !field.type) {
            delete field.key;
            field.fieldGroup = [
                this.resolveMultiSchema('oneOf', schema.oneOf, { ...options, key, shareFormControl: false }),
            ];
        }
        // map in possible formlyConfig options from the widget property
        if (schema.widget?.formlyConfig) {
            field = this.mergeFields(field, schema.widget.formlyConfig);
        }
        field.templateOptions = field.props;
        // if there is a map function passed in, use it to allow the user to
        // further customize how fields are being mapped
        return options.map ? options.map(field, schema) : field;
    }
    resolveSchema(schema, options) {
        if (schema && schema.$ref) {
            schema = this.resolveDefinition(schema, options);
        }
        if (schema && schema.allOf) {
            schema = this.resolveAllOf(schema, options);
        }
        return schema;
    }
    resolveAllOf({ allOf, ...baseSchema }, options) {
        if (!allOf.length) {
            throw Error(`allOf array can not be empty ${allOf}.`);
        }
        return allOf.reduce((base, schema) => {
            schema = this.resolveSchema(schema, options);
            if (base.required && schema.required) {
                base.required = [...base.required, ...schema.required];
            }
            if (schema.uniqueItems) {
                base.uniqueItems = schema.uniqueItems;
            }
            // resolve to min value
            ['maxLength', 'maximum', 'exclusiveMaximum', 'maxItems', 'maxProperties'].forEach((prop) => {
                if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
                    base[prop] = base[prop] < schema[prop] ? base[prop] : schema[prop];
                }
            });
            // resolve to max value
            ['minLength', 'minimum', 'exclusiveMinimum', 'minItems', 'minProperties'].forEach((prop) => {
                if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
                    base[prop] = base[prop] > schema[prop] ? base[prop] : schema[prop];
                }
            });
            return reverseDeepMerge(base, schema);
        }, baseSchema);
    }
    resolveMultiSchema(mode, schemas, options) {
        return {
            type: 'multischema',
            fieldGroup: [
                {
                    type: 'enum',
                    defaultValue: -1,
                    props: {
                        multiple: mode === 'anyOf',
                        options: schemas.map((s, i) => ({ label: s.title, value: i, disabled: s.readOnly })),
                    },
                    hooks: {
                        onInit: (f) => f.formControl.valueChanges.pipe(tap(() => f.options.detectChanges(f.parent))),
                    },
                },
                {
                    fieldGroup: schemas.map((s, i) => ({
                        ...this._toFieldConfig(s, { ...options, resetOnHide: true }),
                        expressions: {
                            hide: (f, forceUpdate) => {
                                const control = f.parent.parent.fieldGroup[0].formControl;
                                if (control.value === -1 || forceUpdate) {
                                    let value = f.parent.fieldGroup
                                        .map((f, i) => [f, i, this.isFieldValid(f, i, schemas, options)])
                                        .sort(([f1, , f1Valid], [f2, , f2Valid]) => {
                                        if (f1Valid !== f2Valid) {
                                            return f2Valid ? 1 : -1;
                                        }
                                        const matchedFields1 = totalMatchedFields(f1);
                                        const matchedFields2 = totalMatchedFields(f2);
                                        if (matchedFields1 === matchedFields2) {
                                            if (f1.props.disabled === f2.props.disabled) {
                                                return 0;
                                            }
                                            return matchedFields2 > matchedFields1 ? 1 : -1;
                                        }
                                        return matchedFields2 > matchedFields1 ? 1 : -1;
                                    })
                                        .map(([, i]) => i);
                                    if (mode === 'anyOf') {
                                        const definedValue = value.filter((i) => totalMatchedFields(f.parent.fieldGroup[i]));
                                        value = definedValue.length > 0 ? definedValue : [value[0] || 0];
                                    }
                                    value = value.length > 0 ? value : [0];
                                    control.setValue(mode === 'anyOf' ? value : value[0]);
                                }
                                return Array.isArray(control.value) ? control.value.indexOf(i) === -1 : control.value !== i;
                            },
                        },
                    })),
                },
            ],
        };
    }
    resolveDefinition(schema, options) {
        const [uri, pointer] = schema.$ref.split('#/');
        if (uri) {
            throw Error(`Remote schemas for ${schema.$ref} not supported yet.`);
        }
        const definition = !pointer
            ? null
            : pointer
                .split('/')
                .reduce((def, path) => (def?.hasOwnProperty(path) ? def[path] : null), options.schema);
        if (!definition) {
            throw Error(`Cannot find a definition for ${schema.$ref}.`);
        }
        if (definition.$ref) {
            return this.resolveDefinition(definition, options);
        }
        return {
            ...definition,
            ...['title', 'description', 'default', 'widget'].reduce((annotation, p) => {
                if (schema.hasOwnProperty(p)) {
                    annotation[p] = schema[p];
                }
                return annotation;
            }, {}),
        };
    }
    resolveDependencies(schema) {
        const propDeps = {};
        const schemaDeps = {};
        Object.keys(schema.dependencies || {}).forEach((prop) => {
            const dependency = schema.dependencies[prop];
            if (Array.isArray(dependency)) {
                // Property dependencies
                dependency.forEach((dep) => {
                    if (!propDeps[dep]) {
                        propDeps[dep] = [prop];
                    }
                    else {
                        propDeps[dep].push(prop);
                    }
                });
            }
            else {
                // schema dependencies
                schemaDeps[prop] = dependency;
            }
        });
        return { propDeps, schemaDeps };
    }
    guessSchemaType(schema) {
        const type = schema?.type;
        if (!type && schema?.properties) {
            return ['object'];
        }
        if (Array.isArray(type)) {
            if (type.length === 1) {
                return type;
            }
            if (type.length === 2 && type.indexOf('null') !== -1) {
                return type.sort((t1) => (t1 == 'null' ? 1 : -1));
            }
            return type;
        }
        return type ? [type] : [];
    }
    addValidator(field, name, validator) {
        field.validators = field.validators || {};
        field.validators[name] = validator;
    }
    isEnum(schema) {
        return (!!schema.enum ||
            (schema.anyOf && schema.anyOf.every(isConst)) ||
            (schema.oneOf && schema.oneOf.every(isConst)) ||
            (schema.uniqueItems && schema.items && !Array.isArray(schema.items) && this.isEnum(schema.items)));
    }
    toEnumOptions(schema) {
        if (schema.enum) {
            return schema.enum.map((value) => ({ value, label: value }));
        }
        const toEnum = (s) => {
            const value = s.hasOwnProperty('const') ? s.const : s.enum[0];
            const option = { value, label: s.title || value };
            if (s.readOnly) {
                option.disabled = true;
            }
            return option;
        };
        if (schema.anyOf) {
            return schema.anyOf.map(toEnum);
        }
        if (schema.oneOf) {
            return schema.oneOf.map(toEnum);
        }
        return this.toEnumOptions(schema.items);
    }
    isFieldValid(root, i, schemas, options) {
        const schema = schemas[i];
        if (!schema._field) {
            Object.defineProperty(schema, '_field', { enumerable: false, writable: true, configurable: true });
        }
        let field = schema._field;
        let model = root.model ? clone(root.model) : root.fieldArray ? [] : {};
        if (root.model && hasKey(root)) {
            model = { [Array.isArray(root.key) ? root.key.join('.') : root.key]: getFieldValue(root) };
        }
        if (!field) {
            field = schema._field = root.options.build({
                form: Array.isArray(model) ? new FormArray([]) : new FormGroup({}),
                fieldGroup: [
                    this._toFieldConfig(schema, {
                        ...options,
                        resetOnHide: true,
                        ignoreDefault: true,
                        map: null,
                        strict: true,
                    }),
                ],
                model,
                options: {},
            });
        }
        else {
            field.model = model;
            root.options.build(field);
        }
        return field.form.valid;
    }
    mergeFields(f1, f2) {
        for (let prop in f2) {
            const f1Prop = prop === 'templateOptions' ? 'props' : prop;
            if (isObject(f1[f1Prop]) && isObject(f2[prop])) {
                f1[f1Prop] = this.mergeFields(f1[f1Prop], f2[prop]);
            }
            else if (f2[prop] != null) {
                f1[f1Prop] = f2[prop];
            }
        }
        return f1;
    }
}
FormlyJsonschema.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyJsonschema, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormlyJsonschema.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyJsonschema, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyJsonschema, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWpzb24tc2NoZW1hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9qc29uLXNjaGVtYS9zcmMvZm9ybWx5LWpzb24tc2NoZW1hLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQW1CLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQ0wsaUJBQWlCLElBQUksZ0JBQWdCLEVBQ3JDLGNBQWMsSUFBSSxhQUFhLEVBQy9CLE1BQU0sSUFBSSxLQUFLLEVBQ2YsT0FBTyxJQUFJLE1BQU0sR0FDbEIsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBZXJDLHVDQUF1QztBQUN2QyxTQUFTLGFBQWEsQ0FBQyxDQUFTO0lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxDQUFDLENBQUM7S0FDVjtJQUVELElBQUksQ0FBQyxHQUFHLENBQUMsRUFDUCxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDUixDQUFDLEVBQUUsQ0FBQztLQUNMO0lBRUQsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsQ0FBTTtJQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztBQUMvQixDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsQ0FBTTtJQUN0QixPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEtB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TSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQzlDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNyRDtpQkFBTSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQzNCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkI7U0FDRjtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7OEdBNXFCVSxnQkFBZ0I7a0hBQWhCLGdCQUFnQixjQURILE1BQU07NEZBQ25CLGdCQUFnQjtrQkFENUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgSlNPTlNjaGVtYTcsIEpTT05TY2hlbWE3RGVmaW5pdGlvbiB9IGZyb20gJ2pzb24tc2NoZW1hJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICDJtXJldmVyc2VEZWVwTWVyZ2UgYXMgcmV2ZXJzZURlZXBNZXJnZSxcbiAgybVnZXRGaWVsZFZhbHVlIGFzIGdldEZpZWxkVmFsdWUsXG4gIMm1Y2xvbmUgYXMgY2xvbmUsXG4gIMm1aGFzS2V5IGFzIGhhc0tleSxcbn0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5SnNvbnNjaGVtYU9wdGlvbnMge1xuICAvKipcbiAgICogYWxsb3dzIHRvIGludGVyY2VwdCB0aGUgbWFwcGluZywgdGFraW5nIHRoZSBhbHJlYWR5IG1hcHBlZFxuICAgKiBmb3JtbHkgZmllbGQgYW5kIHRoZSBvcmlnaW5hbCBKU09OU2NoZW1hIHNvdXJjZSBmcm9tIHdoaWNoIGl0XG4gICAqIHdhcyBtYXBwZWQuXG4gICAqL1xuICBtYXA/OiAobWFwcGVkRmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBtYXBTb3VyY2U6IEpTT05TY2hlbWE3KSA9PiBGb3JtbHlGaWVsZENvbmZpZztcbn1cblxuaW50ZXJmYWNlIEZvcm1seUpTT05TY2hlbWE3IGV4dGVuZHMgSlNPTlNjaGVtYTcge1xuICB3aWRnZXQ/OiB7IGZvcm1seUNvbmZpZzogRm9ybWx5RmllbGRDb25maWcgfTtcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI3ODY1Mjg1XG5mdW5jdGlvbiBkZWNpbWFsUGxhY2VzKGE6IG51bWJlcikge1xuICBpZiAoIWlzRmluaXRlKGEpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBsZXQgZSA9IDEsXG4gICAgcCA9IDA7XG4gIHdoaWxlIChNYXRoLnJvdW5kKGEgKiBlKSAvIGUgIT09IGEpIHtcbiAgICBlICo9IDEwO1xuICAgIHArKztcbiAgfVxuXG4gIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiBpc0VtcHR5KHY6IGFueSkge1xuICByZXR1cm4gdiA9PT0gJycgfHwgdiA9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCh2OiBhbnkpIHtcbiAgcmV0dXJuIHYgIT0gbnVsbCAmJiB0eXBlb2YgdiA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodik7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogYW55KSB7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyID8gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgOiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaXNDb25zdChzY2hlbWE6IEpTT05TY2hlbWE3RGVmaW5pdGlvbikge1xuICByZXR1cm4gdHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcgJiYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnY29uc3QnKSB8fCAoc2NoZW1hLmVudW0gJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxKSk7XG59XG5cbmZ1bmN0aW9uIHRvdGFsTWF0Y2hlZEZpZWxkcyhmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiBudW1iZXIge1xuICBpZiAoIWZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICByZXR1cm4gaGFzS2V5KGZpZWxkKSAmJiBnZXRGaWVsZFZhbHVlKGZpZWxkKSAhPT0gdW5kZWZpbmVkID8gMSA6IDA7XG4gIH1cblxuICBjb25zdCB0b3RhbCA9IGZpZWxkLmZpZWxkR3JvdXAucmVkdWNlKChzLCBmKSA9PiB0b3RhbE1hdGNoZWRGaWVsZHMoZikgKyBzLCAwKTtcbiAgaWYgKHRvdGFsID09PSAwICYmIGhhc0tleShmaWVsZCkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGdldEZpZWxkVmFsdWUoZmllbGQpO1xuICAgIGlmIChcbiAgICAgIHZhbHVlID09PSBudWxsIHx8XG4gICAgICAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAoKGZpZWxkLmZpZWxkQXJyYXkgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHx8ICghZmllbGQuZmllbGRBcnJheSAmJiBpc09iamVjdCh2YWx1ZSkpKSlcbiAgICApIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b3RhbDtcbn1cblxuaW50ZXJmYWNlIElPcHRpb25zIGV4dGVuZHMgRm9ybWx5SnNvbnNjaGVtYU9wdGlvbnMge1xuICBzY2hlbWE6IEZvcm1seUpTT05TY2hlbWE3O1xuICByZXNldE9uSGlkZT86IGJvb2xlYW47XG4gIHNoYXJlRm9ybUNvbnRyb2w/OiBib29sZWFuO1xuICBpZ25vcmVEZWZhdWx0PzogYm9vbGVhbjtcbiAgc3RyaWN0PzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBrZXk/OiBGb3JtbHlGaWVsZENvbmZpZ1sna2V5J107XG4gIGlzT3B0aW9uYWw/OiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEZvcm1seUpzb25zY2hlbWEge1xuICB0b0ZpZWxkQ29uZmlnKHNjaGVtYTogSlNPTlNjaGVtYTcsIG9wdGlvbnM/OiBGb3JtbHlKc29uc2NoZW1hT3B0aW9ucyk6IEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICBzY2hlbWEgPSBjbG9uZShzY2hlbWEpO1xuICAgIHJldHVybiB0aGlzLl90b0ZpZWxkQ29uZmlnKHNjaGVtYSwgeyBzY2hlbWEsIC4uLihvcHRpb25zIHx8IHt9KSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RvRmllbGRDb25maWcoc2NoZW1hOiBGb3JtbHlKU09OU2NoZW1hNywgeyBrZXksIC4uLm9wdGlvbnMgfTogSU9wdGlvbnMpOiBGb3JtbHlGaWVsZENvbmZpZyB7XG4gICAgc2NoZW1hID0gdGhpcy5yZXNvbHZlU2NoZW1hKHNjaGVtYSwgb3B0aW9ucyk7XG4gICAgY29uc3QgdHlwZXMgPSB0aGlzLmd1ZXNzU2NoZW1hVHlwZShzY2hlbWEpO1xuXG4gICAgbGV0IGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyAmIHsgc2hhcmVGb3JtQ29udHJvbD86IGJvb2xlYW4gfSA9IHtcbiAgICAgIHR5cGU6IHR5cGVzWzBdLFxuICAgICAgZGVmYXVsdFZhbHVlOiBzY2hlbWEuZGVmYXVsdCxcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIGxhYmVsOiBzY2hlbWEudGl0bGUsXG4gICAgICAgIHJlYWRvbmx5OiBzY2hlbWEucmVhZE9ubHksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzY2hlbWEuZGVzY3JpcHRpb24sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgIGZpZWxkLmtleSA9IGtleTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuaWdub3JlRGVmYXVsdCAmJiAoc2NoZW1hLnJlYWRPbmx5IHx8IG9wdGlvbnMucmVhZE9ubHkpKSB7XG4gICAgICBmaWVsZC5wcm9wcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBvcHRpb25zID0geyAuLi5vcHRpb25zLCByZWFkT25seTogdHJ1ZSB9O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnJlc2V0T25IaWRlKSB7XG4gICAgICBmaWVsZC5yZXNldE9uSGlkZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGtleSAmJiBvcHRpb25zLnN0cmljdCkge1xuICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICd0eXBlJywgKGM6IEFic3RyYWN0Q29udHJvbCwgZjogRm9ybWx5RmllbGRDb25maWcpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGYpO1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzoge1xuICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2ludGVnZXInOiB7XG4gICAgICAgICAgICAgIHJldHVybiBpc0ludGVnZXIodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzoge1xuICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2FycmF5Jzoge1xuICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zaGFyZUZvcm1Db250cm9sID09PSBmYWxzZSkge1xuICAgICAgZmllbGQuc2hhcmVGb3JtQ29udHJvbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmlnbm9yZURlZmF1bHQpIHtcbiAgICAgIGRlbGV0ZSBmaWVsZC5kZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICd0eXBlJywge1xuICAgICAgc2NoZW1hVHlwZTogdHlwZXMsXG4gICAgICBleHByZXNzaW9uOiAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCAmJiB0eXBlcy5pbmRleE9mKCdudWxsJykgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHR5cGVzWzBdKSB7XG4gICAgICAgICAgY2FzZSAnbnVsbCc6IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdpbnRlZ2VyJzoge1xuICAgICAgICAgICAgcmV0dXJuIGlzSW50ZWdlcih2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ251bWJlcic6IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgICAgICByZXR1cm4gaXNPYmplY3QodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdhcnJheSc6IHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdpbnRlZ2VyJzoge1xuICAgICAgICBmaWVsZC5wYXJzZXJzID0gWyh2OiBzdHJpbmcgfCBudW1iZXIpID0+IChpc0VtcHR5KHYpID8gdiA6IE51bWJlcih2KSldO1xuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdtaW5pbXVtJykpIHtcbiAgICAgICAgICBmaWVsZC5wcm9wcy5taW4gPSBzY2hlbWEubWluaW11bTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoJ21heGltdW0nKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLm1heCA9IHNjaGVtYS5tYXhpbXVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZXhjbHVzaXZlTWluaW11bScpKSB7XG4gICAgICAgICAgZmllbGQucHJvcHMuZXhjbHVzaXZlTWluaW11bSA9IHNjaGVtYS5leGNsdXNpdmVNaW5pbXVtO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKFxuICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAnZXhjbHVzaXZlTWluaW11bScsXG4gICAgICAgICAgICAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IGlzRW1wdHkodmFsdWUpIHx8IHZhbHVlID4gc2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoJ2V4Y2x1c2l2ZU1heGltdW0nKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLmV4Y2x1c2l2ZU1heGltdW0gPSBzY2hlbWEuZXhjbHVzaXZlTWF4aW11bTtcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgJ2V4Y2x1c2l2ZU1heGltdW0nLFxuICAgICAgICAgICAgKHsgdmFsdWUgfTogQWJzdHJhY3RDb250cm9sKSA9PiBpc0VtcHR5KHZhbHVlKSB8fCB2YWx1ZSA8IHNjaGVtYS5leGNsdXNpdmVNYXhpbXVtLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdtdWx0aXBsZU9mJykpIHtcbiAgICAgICAgICBmaWVsZC5wcm9wcy5zdGVwID0gc2NoZW1hLm11bHRpcGxlT2Y7XG4gICAgICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICdtdWx0aXBsZU9mJywgKHsgdmFsdWUgfTogQWJzdHJhY3RDb250cm9sKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCB2YWx1ZSA9PT0gMCB8fCBzY2hlbWEubXVsdGlwbGVPZiA8PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYWp2LXZhbGlkYXRvci9hanYvaXNzdWVzLzY1MiNpc3N1ZS0yODM2MTA4NTlcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgZGVjaW1hbFBsYWNlcyhzY2hlbWEubXVsdGlwbGVPZikpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBtdWx0aXBsaWVyKSAlIE1hdGgucm91bmQoc2NoZW1hLm11bHRpcGxlT2YgKiBtdWx0aXBsaWVyKSA9PT0gMDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgICAgZmllbGQucGFyc2VycyA9IFtcbiAgICAgICAgICAodikgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVzLmluZGV4T2YoJ251bGwnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgdiA9IGlzRW1wdHkodikgPyBudWxsIDogdjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWZpZWxkLnByb3BzLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgIHYgPSB2ID09PSAnJyA/IHVuZGVmaW5lZCA6IHY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgWydtaW5MZW5ndGgnLCAnbWF4TGVuZ3RoJywgJ3BhdHRlcm4nXS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgZmllbGQucHJvcHNbcHJvcF0gPSAoc2NoZW1hIGFzIGFueSlbcHJvcF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgIGlmICghZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgcHJvcERlcHMsIHNjaGVtYURlcHMgfSA9IHRoaXMucmVzb2x2ZURlcGVuZGVuY2llcyhzY2hlbWEpO1xuICAgICAgICBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcyB8fCB7fSkuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgICAgICBjb25zdCBpc1JlcXVpcmVkID0gQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpICYmIHNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKHByb3BlcnR5KSAhPT0gLTE7XG4gICAgICAgICAgY29uc3QgZiA9IHRoaXMuX3RvRmllbGRDb25maWcoPEpTT05TY2hlbWE3PnNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSwge1xuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgIGtleTogcHJvcGVydHksXG4gICAgICAgICAgICBpc09wdGlvbmFsOiBvcHRpb25zLmlzT3B0aW9uYWwgfHwgIWlzUmVxdWlyZWQsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwLnB1c2goZik7XG4gICAgICAgICAgaWYgKGlzUmVxdWlyZWQgfHwgcHJvcERlcHNbcHJvcGVydHldKSB7XG4gICAgICAgICAgICBmLmV4cHJlc3Npb25zID0ge1xuICAgICAgICAgICAgICAuLi4oZi5leHByZXNzaW9ucyB8fCB7fSksXG4gICAgICAgICAgICAgICdwcm9wcy5yZXF1aXJlZCc6IChmKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IGYucGFyZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gZi5maWVsZEdyb3VwICYmIGYua2V5ICE9IG51bGwgPyBwYXJlbnQubW9kZWwgOiBmLm1vZGVsO1xuICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnQua2V5ID09IG51bGwgJiYgcGFyZW50LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IHBhcmVudCAmJiBwYXJlbnQucHJvcHMgPyBwYXJlbnQucHJvcHMucmVxdWlyZWQgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIW1vZGVsICYmICFyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5yZXF1aXJlZCkgJiYgc2NoZW1hLnJlcXVpcmVkLmluZGV4T2YocHJvcGVydHkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZXBzW3Byb3BlcnR5XSAmJiBmLm1vZGVsICYmIHByb3BEZXBzW3Byb3BlcnR5XS5zb21lKChrKSA9PiAhaXNFbXB0eShmLm1vZGVsW2tdKSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzY2hlbWFEZXBzW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgY29uc3QgZ2V0Q29uc3RWYWx1ZSA9IChzOiBKU09OU2NoZW1hNykgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gcy5oYXNPd25Qcm9wZXJ0eSgnY29uc3QnKSA/IHMuY29uc3QgOiBzLmVudW1bMF07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBvbmVPZlNjaGVtYSA9IHNjaGVtYURlcHNbcHJvcGVydHldLm9uZU9mIGFzIEpTT05TY2hlbWE3W107XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG9uZU9mU2NoZW1hICYmXG4gICAgICAgICAgICAgIG9uZU9mU2NoZW1hLmV2ZXJ5KChvKSA9PiBvLnByb3BlcnRpZXMgJiYgby5wcm9wZXJ0aWVzW3Byb3BlcnR5XSAmJiBpc0NvbnN0KG8ucHJvcGVydGllc1twcm9wZXJ0eV0pKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIG9uZU9mU2NoZW1hLmZvckVhY2goKG9uZU9mU2NoZW1hSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgW3Byb3BlcnR5XTogY29uc3RTY2hlbWEsIC4uLnByb3BlcnRpZXMgfSA9IG9uZU9mU2NoZW1hSXRlbS5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaCh7XG4gICAgICAgICAgICAgICAgICAuLi50aGlzLl90b0ZpZWxkQ29uZmlnKFxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9uZU9mU2NoZW1hSXRlbSwgcHJvcGVydGllcyB9LFxuICAgICAgICAgICAgICAgICAgICB7IC4uLm9wdGlvbnMsIHNoYXJlRm9ybUNvbnRyb2w6IGZhbHNlLCByZXNldE9uSGlkZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGhpZGU6IChmKSA9PiAhZi5tb2RlbCB8fCBnZXRDb25zdFZhbHVlKGNvbnN0U2NoZW1hIGFzIEpTT05TY2hlbWE3KSAhPT0gZi5tb2RlbFtwcm9wZXJ0eV0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaCh7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5fdG9GaWVsZENvbmZpZyhzY2hlbWFEZXBzW3Byb3BlcnR5XSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpZGU6IChmKSA9PiAhZi5tb2RlbCB8fCBpc0VtcHR5KGYubW9kZWxbcHJvcGVydHldKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzY2hlbWEub25lT2YpIHtcbiAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwLnB1c2goXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVNdWx0aVNjaGVtYSgnb25lT2YnLCA8SlNPTlNjaGVtYTdbXT5zY2hlbWEub25lT2YsIHsgLi4ub3B0aW9ucywgc2hhcmVGb3JtQ29udHJvbDogZmFsc2UgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEuYW55T2YpIHtcbiAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwLnB1c2godGhpcy5yZXNvbHZlTXVsdGlTY2hlbWEoJ2FueU9mJywgPEpTT05TY2hlbWE3W10+c2NoZW1hLmFueU9mLCBvcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdhcnJheSc6IHtcbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWluSXRlbXMnKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLm1pbkl0ZW1zID0gc2NoZW1hLm1pbkl0ZW1zO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAnbWluSXRlbXMnLCAoYzogQWJzdHJhY3RDb250cm9sLCBmOiBGb3JtbHlGaWVsZENvbmZpZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGYpO1xuICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA+PSBzY2hlbWEubWluSXRlbXM7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIW9wdGlvbnMuaXNPcHRpb25hbCAmJiBzY2hlbWEubWluSXRlbXMgPiAwICYmIGZpZWxkLmRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBBcnJheS5mcm9tKG5ldyBBcnJheShzY2hlbWEubWluSXRlbXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWF4SXRlbXMnKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLm1heEl0ZW1zID0gc2NoZW1hLm1heEl0ZW1zO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAnbWF4SXRlbXMnLCAoYzogQWJzdHJhY3RDb250cm9sLCBmOiBGb3JtbHlGaWVsZENvbmZpZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGYpO1xuICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA8PSBzY2hlbWEubWF4SXRlbXM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgndW5pcXVlSXRlbXMnKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLnVuaXF1ZUl0ZW1zID0gc2NoZW1hLnVuaXF1ZUl0ZW1zO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAndW5pcXVlSXRlbXMnLCAoYzogQWJzdHJhY3RDb250cm9sLCBmOiBGb3JtbHlGaWVsZENvbmZpZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGYpO1xuICAgICAgICAgICAgaWYgKGlzRW1wdHkodmFsdWUpIHx8ICFzY2hlbWEudW5pcXVlSXRlbXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXF1ZUl0ZW1zID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgbmV3IFNldChcbiAgICAgICAgICAgICAgICB2YWx1ZS5tYXAoKHY6IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHYsIChrLCBvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09iamVjdChvKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgob2JqOiBhbnksIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IG9ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVJdGVtcy5sZW5ndGggPT09IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc29sdmUgaXRlbXMgc2NoZW1hIG5lZWRlZCBmb3IgaXNFbnVtIGNoZWNrXG4gICAgICAgIGlmIChzY2hlbWEuaXRlbXMgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgIHNjaGVtYS5pdGVtcyA9IHRoaXMucmVzb2x2ZVNjaGVtYSg8SlNPTlNjaGVtYTc+c2NoZW1hLml0ZW1zLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IHJlbW92ZSBpc0VudW0gY2hlY2sgb25jZSBhZGRpbmcgYW4gb3B0aW9uIHRvIHNraXAgZXh0ZW5zaW9uXG4gICAgICAgIGlmICghdGhpcy5pc0VudW0oc2NoZW1hKSkge1xuICAgICAgICAgIGZpZWxkLmZpZWxkQXJyYXkgPSAocm9vdDogRm9ybWx5RmllbGRDb25maWcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gc2NoZW1hLml0ZW1zIGFzIEpTT05TY2hlbWE3IHwgSlNPTlNjaGVtYTdbXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgICAgICAgICAgaWYgKCFpdGVtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGlzTXVsdGlTY2hlbWEgPSBpdGVtcy5vbmVPZiB8fCBpdGVtcy5hbnlPZjtcblxuICAgICAgICAgICAgICAvLyBXaGVuIGl0ZW1zIGlzIGEgc2luZ2xlIHNjaGVtYSwgdGhlIGFkZGl0aW9uYWxJdGVtcyBrZXl3b3JkIGlzIG1lYW5pbmdsZXNzLCBhbmQgaXQgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgICAgICAgICAgICBjb25zdCBmID0gdGhpcy5fdG9GaWVsZENvbmZpZyhcbiAgICAgICAgICAgICAgICBpdGVtcyxcbiAgICAgICAgICAgICAgICBpc011bHRpU2NoZW1hID8geyAuLi5vcHRpb25zLCBrZXk6IGAke3Jvb3QuZmllbGRHcm91cC5sZW5ndGh9YCB9IDogb3B0aW9ucyxcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBpZiAoaXNNdWx0aVNjaGVtYSAmJiAhaGFzS2V5KGYpKSB7XG4gICAgICAgICAgICAgICAgZi5rZXkgPSBudWxsO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZi5wcm9wcy5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHJvb3QuZmllbGRHcm91cCA/IHJvb3QuZmllbGRHcm91cC5sZW5ndGggOiAwO1xuICAgICAgICAgICAgY29uc3QgaXRlbVNjaGVtYSA9IGl0ZW1zW2xlbmd0aF0gPyBpdGVtc1tsZW5ndGhdIDogc2NoZW1hLmFkZGl0aW9uYWxJdGVtcztcbiAgICAgICAgICAgIGNvbnN0IGYgPSBpdGVtU2NoZW1hID8gdGhpcy5fdG9GaWVsZENvbmZpZyg8SlNPTlNjaGVtYTc+aXRlbVNjaGVtYSwgb3B0aW9ucykgOiB7fTtcbiAgICAgICAgICAgIGlmIChmLnByb3BzKSB7XG4gICAgICAgICAgICAgIGYucHJvcHMucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGl0ZW1zW2xlbmd0aF0pIHtcbiAgICAgICAgICAgICAgZi5wcm9wcy5yZW1vdmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdjb25zdCcpKSB7XG4gICAgICBmaWVsZC5wcm9wcy5jb25zdCA9IHNjaGVtYS5jb25zdDtcbiAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAnY29uc3QnLCAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IHZhbHVlID09PSBzY2hlbWEuY29uc3QpO1xuICAgICAgaWYgKCFmaWVsZC50eXBlKSB7XG4gICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9IHNjaGVtYS5jb25zdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0VudW0oc2NoZW1hKSkge1xuICAgICAgY29uc3QgZW51bU9wdGlvbnMgPSB0aGlzLnRvRW51bU9wdGlvbnMoc2NoZW1hKTtcbiAgICAgIGNvbnN0IG11bHRpcGxlID0gZmllbGQudHlwZSA9PT0gJ2FycmF5JztcblxuICAgICAgZmllbGQudHlwZSA9ICdlbnVtJztcbiAgICAgIGZpZWxkLnByb3BzLm11bHRpcGxlID0gbXVsdGlwbGU7XG4gICAgICBmaWVsZC5wcm9wcy5vcHRpb25zID0gZW51bU9wdGlvbnM7XG5cbiAgICAgIGNvbnN0IGVudW1WYWx1ZXMgPSBlbnVtT3B0aW9ucy5tYXAoKG8pID0+IG8udmFsdWUpO1xuICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICdlbnVtJywgKHsgdmFsdWUgfTogQWJzdHJhY3RDb250cm9sKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5ldmVyeSgobykgPT4gZW51bVZhbHVlcy5pbmNsdWRlcyhvKSkgOiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbnVtVmFsdWVzLmluY2x1ZGVzKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWEub25lT2YgJiYgIWZpZWxkLnR5cGUpIHtcbiAgICAgIGRlbGV0ZSBmaWVsZC5rZXk7XG4gICAgICBmaWVsZC5maWVsZEdyb3VwID0gW1xuICAgICAgICB0aGlzLnJlc29sdmVNdWx0aVNjaGVtYSgnb25lT2YnLCA8SlNPTlNjaGVtYTdbXT5zY2hlbWEub25lT2YsIHsgLi4ub3B0aW9ucywga2V5LCBzaGFyZUZvcm1Db250cm9sOiBmYWxzZSB9KSxcbiAgICAgIF07XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5vbmVPZiAmJiAhZmllbGQudHlwZSkge1xuICAgICAgZGVsZXRlIGZpZWxkLmtleTtcbiAgICAgIGZpZWxkLmZpZWxkR3JvdXAgPSBbXG4gICAgICAgIHRoaXMucmVzb2x2ZU11bHRpU2NoZW1hKCdvbmVPZicsIDxKU09OU2NoZW1hN1tdPnNjaGVtYS5vbmVPZiwgeyAuLi5vcHRpb25zLCBrZXksIHNoYXJlRm9ybUNvbnRyb2w6IGZhbHNlIH0pLFxuICAgICAgXTtcbiAgICB9XG5cbiAgICAvLyBtYXAgaW4gcG9zc2libGUgZm9ybWx5Q29uZmlnIG9wdGlvbnMgZnJvbSB0aGUgd2lkZ2V0IHByb3BlcnR5XG4gICAgaWYgKHNjaGVtYS53aWRnZXQ/LmZvcm1seUNvbmZpZykge1xuICAgICAgZmllbGQgPSB0aGlzLm1lcmdlRmllbGRzKGZpZWxkLCBzY2hlbWEud2lkZ2V0LmZvcm1seUNvbmZpZyk7XG4gICAgfVxuXG4gICAgZmllbGQudGVtcGxhdGVPcHRpb25zID0gZmllbGQucHJvcHM7XG4gICAgLy8gaWYgdGhlcmUgaXMgYSBtYXAgZnVuY3Rpb24gcGFzc2VkIGluLCB1c2UgaXQgdG8gYWxsb3cgdGhlIHVzZXIgdG9cbiAgICAvLyBmdXJ0aGVyIGN1c3RvbWl6ZSBob3cgZmllbGRzIGFyZSBiZWluZyBtYXBwZWRcbiAgICByZXR1cm4gb3B0aW9ucy5tYXAgPyBvcHRpb25zLm1hcChmaWVsZCwgc2NoZW1hKSA6IGZpZWxkO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlU2NoZW1hKHNjaGVtYTogSlNPTlNjaGVtYTcsIG9wdGlvbnM6IElPcHRpb25zKTogSlNPTlNjaGVtYTcge1xuICAgIGlmIChzY2hlbWEgJiYgc2NoZW1hLiRyZWYpIHtcbiAgICAgIHNjaGVtYSA9IHRoaXMucmVzb2x2ZURlZmluaXRpb24oc2NoZW1hLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hICYmIHNjaGVtYS5hbGxPZikge1xuICAgICAgc2NoZW1hID0gdGhpcy5yZXNvbHZlQWxsT2Yoc2NoZW1hLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlQWxsT2YoeyBhbGxPZiwgLi4uYmFzZVNjaGVtYSB9OiBGb3JtbHlKU09OU2NoZW1hNywgb3B0aW9uczogSU9wdGlvbnMpIHtcbiAgICBpZiAoIWFsbE9mLmxlbmd0aCkge1xuICAgICAgdGhyb3cgRXJyb3IoYGFsbE9mIGFycmF5IGNhbiBub3QgYmUgZW1wdHkgJHthbGxPZn0uYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChhbGxPZiBhcyBGb3JtbHlKU09OU2NoZW1hN1tdKS5yZWR1Y2UoKGJhc2U6IEZvcm1seUpTT05TY2hlbWE3LCBzY2hlbWE6IEZvcm1seUpTT05TY2hlbWE3KSA9PiB7XG4gICAgICBzY2hlbWEgPSB0aGlzLnJlc29sdmVTY2hlbWEoc2NoZW1hLCBvcHRpb25zKTtcbiAgICAgIGlmIChiYXNlLnJlcXVpcmVkICYmIHNjaGVtYS5yZXF1aXJlZCkge1xuICAgICAgICBiYXNlLnJlcXVpcmVkID0gWy4uLmJhc2UucmVxdWlyZWQsIC4uLnNjaGVtYS5yZXF1aXJlZF07XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2hlbWEudW5pcXVlSXRlbXMpIHtcbiAgICAgICAgYmFzZS51bmlxdWVJdGVtcyA9IHNjaGVtYS51bmlxdWVJdGVtcztcbiAgICAgIH1cblxuICAgICAgLy8gcmVzb2x2ZSB0byBtaW4gdmFsdWVcbiAgICAgIChcbiAgICAgICAgWydtYXhMZW5ndGgnLCAnbWF4aW11bScsICdleGNsdXNpdmVNYXhpbXVtJywgJ21heEl0ZW1zJywgJ21heFByb3BlcnRpZXMnXSBhcyAoa2V5b2YgRm9ybWx5SlNPTlNjaGVtYTcpW11cbiAgICAgICkuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICBpZiAoIWlzRW1wdHkoYmFzZVtwcm9wXSkgJiYgIWlzRW1wdHkoc2NoZW1hW3Byb3BdKSkge1xuICAgICAgICAgIChiYXNlIGFzIGFueSlbcHJvcF0gPSBiYXNlW3Byb3BdIDwgc2NoZW1hW3Byb3BdID8gYmFzZVtwcm9wXSA6IHNjaGVtYVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHJlc29sdmUgdG8gbWF4IHZhbHVlXG4gICAgICAoXG4gICAgICAgIFsnbWluTGVuZ3RoJywgJ21pbmltdW0nLCAnZXhjbHVzaXZlTWluaW11bScsICdtaW5JdGVtcycsICdtaW5Qcm9wZXJ0aWVzJ10gYXMgKGtleW9mIEZvcm1seUpTT05TY2hlbWE3KVtdXG4gICAgICApLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgaWYgKCFpc0VtcHR5KGJhc2VbcHJvcF0pICYmICFpc0VtcHR5KHNjaGVtYVtwcm9wXSkpIHtcbiAgICAgICAgICAoYmFzZSBhcyBhbnkpW3Byb3BdID0gYmFzZVtwcm9wXSA+IHNjaGVtYVtwcm9wXSA/IGJhc2VbcHJvcF0gOiBzY2hlbWFbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmV2ZXJzZURlZXBNZXJnZShiYXNlLCBzY2hlbWEpO1xuICAgIH0sIGJhc2VTY2hlbWEpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlTXVsdGlTY2hlbWEobW9kZTogJ29uZU9mJyB8ICdhbnlPZicsIHNjaGVtYXM6IEpTT05TY2hlbWE3W10sIG9wdGlvbnM6IElPcHRpb25zKTogRm9ybWx5RmllbGRDb25maWcge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnbXVsdGlzY2hlbWEnLFxuICAgICAgZmllbGRHcm91cDogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2VudW0nLFxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogLTEsXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIG11bHRpcGxlOiBtb2RlID09PSAnYW55T2YnLFxuICAgICAgICAgICAgb3B0aW9uczogc2NoZW1hcy5tYXAoKHMsIGkpID0+ICh7IGxhYmVsOiBzLnRpdGxlLCB2YWx1ZTogaSwgZGlzYWJsZWQ6IHMucmVhZE9ubHkgfSkpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaG9va3M6IHtcbiAgICAgICAgICAgIG9uSW5pdDogKGYpID0+IGYuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFwKCgpID0+IGYub3B0aW9ucy5kZXRlY3RDaGFuZ2VzKGYucGFyZW50KSkpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaWVsZEdyb3VwOiBzY2hlbWFzLm1hcCgocywgaSkgPT4gKHtcbiAgICAgICAgICAgIC4uLnRoaXMuX3RvRmllbGRDb25maWcocywgeyAuLi5vcHRpb25zLCByZXNldE9uSGlkZTogdHJ1ZSB9KSxcbiAgICAgICAgICAgIGV4cHJlc3Npb25zOiB7XG4gICAgICAgICAgICAgIGhpZGU6IChmLCBmb3JjZVVwZGF0ZT86IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gZi5wYXJlbnQucGFyZW50LmZpZWxkR3JvdXBbMF0uZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgPT09IC0xIHx8IGZvcmNlVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBmLnBhcmVudC5maWVsZEdyb3VwXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgKGYsIGkpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBbZiwgaSwgdGhpcy5pc0ZpZWxkVmFsaWQoZiwgaSwgc2NoZW1hcywgb3B0aW9ucyldIGFzIFtGb3JtbHlGaWVsZENvbmZpZywgbnVtYmVyLCBib29sZWFuXSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuc29ydCgoW2YxLCAsIGYxVmFsaWRdLCBbZjIsICwgZjJWYWxpZF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZjFWYWxpZCAhPT0gZjJWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGYyVmFsaWQgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlZEZpZWxkczEgPSB0b3RhbE1hdGNoZWRGaWVsZHMoZjEpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRGaWVsZHMyID0gdG90YWxNYXRjaGVkRmllbGRzKGYyKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZEZpZWxkczEgPT09IG1hdGNoZWRGaWVsZHMyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZjEucHJvcHMuZGlzYWJsZWQgPT09IGYyLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlZEZpZWxkczIgPiBtYXRjaGVkRmllbGRzMSA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlZEZpZWxkczIgPiBtYXRjaGVkRmllbGRzMSA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoWywgaV0pID0+IGkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAobW9kZSA9PT0gJ2FueU9mJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZpbmVkVmFsdWUgPSB2YWx1ZS5maWx0ZXIoKGkpID0+IHRvdGFsTWF0Y2hlZEZpZWxkcyhmLnBhcmVudC5maWVsZEdyb3VwW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGVmaW5lZFZhbHVlLmxlbmd0aCA+IDAgPyBkZWZpbmVkVmFsdWUgOiBbdmFsdWVbMF0gfHwgMF07XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUubGVuZ3RoID4gMCA/IHZhbHVlIDogWzBdO1xuICAgICAgICAgICAgICAgICAgY29udHJvbC5zZXRWYWx1ZShtb2RlID09PSAnYW55T2YnID8gdmFsdWUgOiB2YWx1ZVswXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoY29udHJvbC52YWx1ZSkgPyBjb250cm9sLnZhbHVlLmluZGV4T2YoaSkgPT09IC0xIDogY29udHJvbC52YWx1ZSAhPT0gaTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSkpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlRGVmaW5pdGlvbihzY2hlbWE6IEZvcm1seUpTT05TY2hlbWE3LCBvcHRpb25zOiBJT3B0aW9ucyk6IEZvcm1seUpTT05TY2hlbWE3IHtcbiAgICBjb25zdCBbdXJpLCBwb2ludGVyXSA9IHNjaGVtYS4kcmVmLnNwbGl0KCcjLycpO1xuICAgIGlmICh1cmkpIHtcbiAgICAgIHRocm93IEVycm9yKGBSZW1vdGUgc2NoZW1hcyBmb3IgJHtzY2hlbWEuJHJlZn0gbm90IHN1cHBvcnRlZCB5ZXQuYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmaW5pdGlvbiA9ICFwb2ludGVyXG4gICAgICA/IG51bGxcbiAgICAgIDogcG9pbnRlclxuICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgLnJlZHVjZSgoZGVmLCBwYXRoKSA9PiAoZGVmPy5oYXNPd25Qcm9wZXJ0eShwYXRoKSA/IChkZWYgYXMgYW55KVtwYXRoXSA6IG51bGwpLCBvcHRpb25zLnNjaGVtYSk7XG5cbiAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBhIGRlZmluaXRpb24gZm9yICR7c2NoZW1hLiRyZWZ9LmApO1xuICAgIH1cblxuICAgIGlmIChkZWZpbml0aW9uLiRyZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc29sdmVEZWZpbml0aW9uKGRlZmluaXRpb24sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5kZWZpbml0aW9uLFxuICAgICAgLi4uWyd0aXRsZScsICdkZXNjcmlwdGlvbicsICdkZWZhdWx0JywgJ3dpZGdldCddLnJlZHVjZSgoYW5ub3RhdGlvbiwgcCkgPT4ge1xuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgICAgYW5ub3RhdGlvbltwXSA9IChzY2hlbWEgYXMgYW55KVtwXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbm5vdGF0aW9uO1xuICAgICAgfSwge30gYXMgYW55KSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYTogSlNPTlNjaGVtYTcpIHtcbiAgICBjb25zdCBwcm9wRGVwczogeyBbaWQ6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7fTtcbiAgICBjb25zdCBzY2hlbWFEZXBzOiB7IFtpZDogc3RyaW5nXTogSlNPTlNjaGVtYTcgfSA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoc2NoZW1hLmRlcGVuZGVuY2llcyB8fCB7fSkuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgY29uc3QgZGVwZW5kZW5jeSA9IHNjaGVtYS5kZXBlbmRlbmNpZXNbcHJvcF0gYXMgSlNPTlNjaGVtYTc7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkZXBlbmRlbmN5KSkge1xuICAgICAgICAvLyBQcm9wZXJ0eSBkZXBlbmRlbmNpZXNcbiAgICAgICAgZGVwZW5kZW5jeS5mb3JFYWNoKChkZXApID0+IHtcbiAgICAgICAgICBpZiAoIXByb3BEZXBzW2RlcF0pIHtcbiAgICAgICAgICAgIHByb3BEZXBzW2RlcF0gPSBbcHJvcF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BEZXBzW2RlcF0ucHVzaChwcm9wKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc2NoZW1hIGRlcGVuZGVuY2llc1xuICAgICAgICBzY2hlbWFEZXBzW3Byb3BdID0gZGVwZW5kZW5jeTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7IHByb3BEZXBzLCBzY2hlbWFEZXBzIH07XG4gIH1cblxuICBwcml2YXRlIGd1ZXNzU2NoZW1hVHlwZShzY2hlbWE6IEpTT05TY2hlbWE3KSB7XG4gICAgY29uc3QgdHlwZSA9IHNjaGVtYT8udHlwZTtcbiAgICBpZiAoIXR5cGUgJiYgc2NoZW1hPy5wcm9wZXJ0aWVzKSB7XG4gICAgICByZXR1cm4gWydvYmplY3QnXTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgICAgaWYgKHR5cGUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS5sZW5ndGggPT09IDIgJiYgdHlwZS5pbmRleE9mKCdudWxsJykgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0eXBlLnNvcnQoKHQxKSA9PiAodDEgPT0gJ251bGwnID8gMSA6IC0xKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlID8gW3R5cGVdIDogW107XG4gIH1cblxuICBwcml2YXRlIGFkZFZhbGlkYXRvcihmaWVsZDogRm9ybWx5RmllbGRDb25maWcsIG5hbWU6IHN0cmluZywgdmFsaWRhdG9yOiBGb3JtbHlGaWVsZENvbmZpZ1sndmFsaWRhdG9ycyddKSB7XG4gICAgZmllbGQudmFsaWRhdG9ycyA9IGZpZWxkLnZhbGlkYXRvcnMgfHwge307XG4gICAgZmllbGQudmFsaWRhdG9yc1tuYW1lXSA9IHZhbGlkYXRvcjtcbiAgfVxuXG4gIHByaXZhdGUgaXNFbnVtKHNjaGVtYTogSlNPTlNjaGVtYTcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgISFzY2hlbWEuZW51bSB8fFxuICAgICAgKHNjaGVtYS5hbnlPZiAmJiAoc2NoZW1hLmFueU9mIGFzIEpTT05TY2hlbWE3W10pLmV2ZXJ5KGlzQ29uc3QpKSB8fFxuICAgICAgKHNjaGVtYS5vbmVPZiAmJiAoc2NoZW1hLm9uZU9mIGFzIEpTT05TY2hlbWE3W10pLmV2ZXJ5KGlzQ29uc3QpKSB8fFxuICAgICAgKHNjaGVtYS51bmlxdWVJdGVtcyAmJiBzY2hlbWEuaXRlbXMgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSAmJiB0aGlzLmlzRW51bSg8SlNPTlNjaGVtYTc+c2NoZW1hLml0ZW1zKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSB0b0VudW1PcHRpb25zKHNjaGVtYTogSlNPTlNjaGVtYTcpOiB7IHZhbHVlOiBhbnk7IGxhYmVsOiBhbnkgfVtdIHtcbiAgICBpZiAoc2NoZW1hLmVudW0pIHtcbiAgICAgIHJldHVybiBzY2hlbWEuZW51bS5tYXAoKHZhbHVlKSA9PiAoeyB2YWx1ZSwgbGFiZWw6IHZhbHVlIH0pKTtcbiAgICB9XG5cbiAgICBjb25zdCB0b0VudW0gPSAoczogSlNPTlNjaGVtYTcpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcy5oYXNPd25Qcm9wZXJ0eSgnY29uc3QnKSA/IHMuY29uc3QgOiBzLmVudW1bMF07XG4gICAgICBjb25zdCBvcHRpb246IGFueSA9IHsgdmFsdWUsIGxhYmVsOiBzLnRpdGxlIHx8IHZhbHVlIH07XG4gICAgICBpZiAocy5yZWFkT25seSkge1xuICAgICAgICBvcHRpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3B0aW9uO1xuICAgIH07XG5cbiAgICBpZiAoc2NoZW1hLmFueU9mKSB7XG4gICAgICByZXR1cm4gKHNjaGVtYS5hbnlPZiBhcyBKU09OU2NoZW1hN1tdKS5tYXAodG9FbnVtKTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hLm9uZU9mKSB7XG4gICAgICByZXR1cm4gKHNjaGVtYS5vbmVPZiBhcyBKU09OU2NoZW1hN1tdKS5tYXAodG9FbnVtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50b0VudW1PcHRpb25zKDxKU09OU2NoZW1hNz5zY2hlbWEuaXRlbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0ZpZWxkVmFsaWQoXG4gICAgcm9vdDogRm9ybWx5RmllbGRDb25maWcgJiB7IF9zY2hlbWFzRmllbGRzPzogeyBba2V5OiBudW1iZXJdOiBGb3JtbHlGaWVsZENvbmZpZyB9IH0sXG4gICAgaTogbnVtYmVyLFxuICAgIHNjaGVtYXM6IEpTT05TY2hlbWE3W10sXG4gICAgb3B0aW9uczogSU9wdGlvbnMsXG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNjaGVtYSA9IHNjaGVtYXNbaV0gYXMgSlNPTlNjaGVtYTcgJiB7IF9maWVsZD86IEZvcm1seUZpZWxkQ29uZmlnIH07XG4gICAgaWYgKCFzY2hlbWEuX2ZpZWxkKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NoZW1hLCAnX2ZpZWxkJywgeyBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBsZXQgZmllbGQgPSBzY2hlbWEuX2ZpZWxkO1xuICAgIGxldCBtb2RlbCA9IHJvb3QubW9kZWwgPyBjbG9uZShyb290Lm1vZGVsKSA6IHJvb3QuZmllbGRBcnJheSA/IFtdIDoge307XG4gICAgaWYgKHJvb3QubW9kZWwgJiYgaGFzS2V5KHJvb3QpKSB7XG4gICAgICBtb2RlbCA9IHsgW0FycmF5LmlzQXJyYXkocm9vdC5rZXkpID8gcm9vdC5rZXkuam9pbignLicpIDogcm9vdC5rZXldOiBnZXRGaWVsZFZhbHVlKHJvb3QpIH07XG4gICAgfVxuICAgIGlmICghZmllbGQpIHtcbiAgICAgIGZpZWxkID0gc2NoZW1hLl9maWVsZCA9IHJvb3Qub3B0aW9ucy5idWlsZCh7XG4gICAgICAgIGZvcm06IEFycmF5LmlzQXJyYXkobW9kZWwpID8gbmV3IEZvcm1BcnJheShbXSkgOiBuZXcgRm9ybUdyb3VwKHt9KSxcbiAgICAgICAgZmllbGRHcm91cDogW1xuICAgICAgICAgIHRoaXMuX3RvRmllbGRDb25maWcoc2NoZW1hLCB7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgcmVzZXRPbkhpZGU6IHRydWUsXG4gICAgICAgICAgICBpZ25vcmVEZWZhdWx0OiB0cnVlLFxuICAgICAgICAgICAgbWFwOiBudWxsLFxuICAgICAgICAgICAgc3RyaWN0OiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICBtb2RlbCxcbiAgICAgICAgb3B0aW9uczoge30sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgKGZpZWxkIGFzIGFueSkubW9kZWwgPSBtb2RlbDtcbiAgICAgIHJvb3Qub3B0aW9ucy5idWlsZChmaWVsZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkLmZvcm0udmFsaWQ7XG4gIH1cblxuICBwcml2YXRlIG1lcmdlRmllbGRzKGYxOiBhbnksIGYyOiBhbnkpIHtcbiAgICBmb3IgKGxldCBwcm9wIGluIGYyKSB7XG4gICAgICBjb25zdCBmMVByb3AgPSBwcm9wID09PSAndGVtcGxhdGVPcHRpb25zJyA/ICdwcm9wcycgOiBwcm9wO1xuICAgICAgaWYgKGlzT2JqZWN0KGYxW2YxUHJvcF0pICYmIGlzT2JqZWN0KGYyW3Byb3BdKSkge1xuICAgICAgICBmMVtmMVByb3BdID0gdGhpcy5tZXJnZUZpZWxkcyhmMVtmMVByb3BdLCBmMltwcm9wXSk7XG4gICAgICB9IGVsc2UgaWYgKGYyW3Byb3BdICE9IG51bGwpIHtcbiAgICAgICAgZjFbZjFQcm9wXSA9IGYyW3Byb3BdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmMTtcbiAgfVxufVxuIl19