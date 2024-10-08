/**
 * Valoriza IoT API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { CreateDeviceDto } from '../model/createDeviceDto';
import { DeviceDto } from '../model/deviceDto';
import { DeviceDtoPagedResultDto } from '../model/deviceDtoPagedResultDto';
import { IncorrectResultDto } from '../model/incorrectResultDto';
import { UpdateDeviceDto } from '../model/updateDeviceDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DevicesService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param actualPage 
     * @param pageSize 
     * @param sort 
     * @param filters 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeaturesV1DevicesGet(actualPage?: number, pageSize?: number, sort?: string, filters?: { [key: string]: string; }, observe?: 'body', reportProgress?: boolean): Observable<DeviceDtoPagedResultDto>;
    public apiFeaturesV1DevicesGet(actualPage?: number, pageSize?: number, sort?: string, filters?: { [key: string]: string; }, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DeviceDtoPagedResultDto>>;
    public apiFeaturesV1DevicesGet(actualPage?: number, pageSize?: number, sort?: string, filters?: { [key: string]: string; }, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DeviceDtoPagedResultDto>>;
    public apiFeaturesV1DevicesGet(actualPage?: number, pageSize?: number, sort?: string, filters?: { [key: string]: string; }, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (actualPage !== undefined && actualPage !== null) {
            queryParameters = queryParameters.set('ActualPage', <any>actualPage);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('PageSize', <any>pageSize);
        }
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('Sort', <any>sort);
        }
        if (filters !== undefined && filters !== null) {
            queryParameters = queryParameters.set('Filters', <any>filters);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<DeviceDtoPagedResultDto>('get',`${this.basePath}/api/features/v1/devices`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param deviceUniqueId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeaturesV1DevicesGetByDeviceUniqueIdGet(deviceUniqueId?: string, observe?: 'body', reportProgress?: boolean): Observable<DeviceDto>;
    public apiFeaturesV1DevicesGetByDeviceUniqueIdGet(deviceUniqueId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DeviceDto>>;
    public apiFeaturesV1DevicesGetByDeviceUniqueIdGet(deviceUniqueId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DeviceDto>>;
    public apiFeaturesV1DevicesGetByDeviceUniqueIdGet(deviceUniqueId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (deviceUniqueId !== undefined && deviceUniqueId !== null) {
            queryParameters = queryParameters.set('deviceUniqueId', <any>deviceUniqueId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<DeviceDto>('get',`${this.basePath}/api/features/v1/devices/GetByDeviceUniqueId`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeaturesV1DevicesIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<number>;
    public apiFeaturesV1DevicesIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<number>>;
    public apiFeaturesV1DevicesIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<number>>;
    public apiFeaturesV1DevicesIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiFeaturesV1DevicesIdDelete.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<number>('delete',`${this.basePath}/api/features/v1/devices/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeaturesV1DevicesIdGet(id: number, observe?: 'body', reportProgress?: boolean): Observable<DeviceDto>;
    public apiFeaturesV1DevicesIdGet(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DeviceDto>>;
    public apiFeaturesV1DevicesIdGet(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DeviceDto>>;
    public apiFeaturesV1DevicesIdGet(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiFeaturesV1DevicesIdGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<DeviceDto>('get',`${this.basePath}/api/features/v1/devices/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeaturesV1DevicesPost(body?: CreateDeviceDto, observe?: 'body', reportProgress?: boolean): Observable<DeviceDto>;
    public apiFeaturesV1DevicesPost(body?: CreateDeviceDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DeviceDto>>;
    public apiFeaturesV1DevicesPost(body?: CreateDeviceDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DeviceDto>>;
    public apiFeaturesV1DevicesPost(body?: CreateDeviceDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<DeviceDto>('post',`${this.basePath}/api/features/v1/devices`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeaturesV1DevicesPut(body?: UpdateDeviceDto, observe?: 'body', reportProgress?: boolean): Observable<DeviceDto>;
    public apiFeaturesV1DevicesPut(body?: UpdateDeviceDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DeviceDto>>;
    public apiFeaturesV1DevicesPut(body?: UpdateDeviceDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DeviceDto>>;
    public apiFeaturesV1DevicesPut(body?: UpdateDeviceDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<DeviceDto>('put',`${this.basePath}/api/features/v1/devices`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
