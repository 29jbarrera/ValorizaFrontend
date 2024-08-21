import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AmortizacionesService } from './api/amortizaciones.service';
import { AppParameterService } from './api/appParameter.service';
import { BidonesService } from './api/bidones.service';
import { CategoriasService } from './api/categorias.service';
import { CentrosCostesService } from './api/centrosCostes.service';
import { CombustiblesService } from './api/combustibles.service';
import { DepositosService } from './api/depositos.service';
import { FamiliasService } from './api/familias.service';
import { GastosTallerService } from './api/gastosTaller.service';
import { GlobalTablesService } from './api/globalTables.service';
import { GlobalTablesValuesService } from './api/globalTablesValues.service';
import { GlobalTablesValuesLangService } from './api/globalTablesValuesLang.service';
import { GncService } from './api/gnc.service';
import { GncDocsService } from './api/gncDocs.service';
import { GruasService } from './api/gruas.service';
import { GruposCentroService } from './api/gruposCentro.service';
import { HmKmService } from './api/hmKm.service';
import { HmKmHistoricoService } from './api/hmKmHistorico.service';
import { ImpuestosService } from './api/impuestos.service';
import { ImpuestosHistoricoService } from './api/impuestosHistorico.service';
import { InstalacionesService } from './api/instalaciones.service';
import { MaquinariaCambioDeCentroService } from './api/maquinariaCambioDeCentro.service';
import { MaquinariasService } from './api/maquinarias.service';
import { MaquinariasChasisService } from './api/maquinariasChasis.service';
import { MaquinariasDocsService } from './api/maquinariasDocs.service';
import { MaquinariasEquiposService } from './api/maquinariasEquipos.service';
import { MaquinariasHistoricoService } from './api/maquinariasHistorico.service';
import { MaquinariasImagenesDocsService } from './api/maquinariasImagenesDocs.service';
import { MaquinariasImplementosService } from './api/maquinariasImplementos.service';
import { MaquinariasInspeccionesTecnicasService } from './api/maquinariasInspeccionesTecnicas.service';
import { MaquinariasInspeccionesTecnicasDocsService } from './api/maquinariasInspeccionesTecnicasDocs.service';
import { MaquinariasInspeccionesTecnicasHistoricoService } from './api/maquinariasInspeccionesTecnicasHistorico.service';
import { MaquinariasNivelesService } from './api/maquinariasNiveles.service';
import { MaquinariasNivelesDocsService } from './api/maquinariasNivelesDocs.service';
import { MaquinariasObservacionesService } from './api/maquinariasObservaciones.service';
import { MaquinariasPartesDeTrabajoDocumentosService } from './api/maquinariasPartesDeTrabajoDocumentos.service';
import { MaquinariasReparacionesService } from './api/maquinariasReparaciones.service';
import { MaquinariasReparacionesDocsService } from './api/maquinariasReparacionesDocs.service';
import { MaquinariasReparacionesHistoricoService } from './api/maquinariasReparacionesHistorico.service';
import { MaquinariasRepostajesService } from './api/maquinariasRepostajes.service';
import { MaquinariasTacografosService } from './api/maquinariasTacografos.service';
import { MarcasService } from './api/marcas.service';
import { NivelMantenimientoAccionService } from './api/nivelMantenimientoAccion.service';
import { NivelMantenimientoAccionesLangService } from './api/nivelMantenimientoAccionesLang.service';
import { NivelesDeMantenimientoService } from './api/nivelesDeMantenimiento.service';
import { NivelesDeMantenimientoTipoService } from './api/nivelesDeMantenimientoTipo.service';
import { NivelesDeMantenimientoTipoDeAccinService } from './api/nivelesDeMantenimientoTipoDeAccin.service';
import { NivelesGrupoAccionService } from './api/nivelesGrupoAccion.service';
import { PartesDeTrabajoService } from './api/partesDeTrabajo.service';
import { PartesDeTrabajoDocumentosService } from './api/partesDeTrabajoDocumentos.service';
import { PartesDeTrabajoMaterialesService } from './api/partesDeTrabajoMateriales.service';
import { PartesDeTrabajoMecanicosService } from './api/partesDeTrabajoMecanicos.service';
import { PesoYCargaService } from './api/pesoYCarga.service';
import { PrestamosYStockService } from './api/prestamosYStock.service';
import { ProveedoresService } from './api/proveedores.service';
import { ReferenciaDeMaterialesService } from './api/referenciaDeMateriales.service';
import { RegulacionesDeStockService } from './api/regulacionesDeStock.service';
import { SegurosService } from './api/seguros.service';
import { StockService } from './api/stock.service';
import { TacografosDocService } from './api/tacografosDoc.service';
import { UnidadesDeMedidaService } from './api/unidadesDeMedida.service';
import { UnidadesDeMedidaTiposDeCombustibleService } from './api/unidadesDeMedidaTiposDeCombustible.service';
import { UsuarioCentroService } from './api/usuarioCentro.service';
import { ValorizaGlobalTableService } from './api/valorizaGlobalTable.service';
import { VistasService } from './api/vistas.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AmortizacionesService,
    AppParameterService,
    BidonesService,
    CategoriasService,
    CentrosCostesService,
    CombustiblesService,
    DepositosService,
    FamiliasService,
    GastosTallerService,
    GlobalTablesService,
    GlobalTablesValuesService,
    GlobalTablesValuesLangService,
    GncService,
    GncDocsService,
    GruasService,
    GruposCentroService,
    HmKmService,
    HmKmHistoricoService,
    ImpuestosService,
    ImpuestosHistoricoService,
    InstalacionesService,
    MaquinariaCambioDeCentroService,
    MaquinariasService,
    MaquinariasChasisService,
    MaquinariasDocsService,
    MaquinariasEquiposService,
    MaquinariasHistoricoService,
    MaquinariasImagenesDocsService,
    MaquinariasImplementosService,
    MaquinariasInspeccionesTecnicasService,
    MaquinariasInspeccionesTecnicasDocsService,
    MaquinariasInspeccionesTecnicasHistoricoService,
    MaquinariasNivelesService,
    MaquinariasNivelesDocsService,
    MaquinariasObservacionesService,
    MaquinariasPartesDeTrabajoDocumentosService,
    MaquinariasReparacionesService,
    MaquinariasReparacionesDocsService,
    MaquinariasReparacionesHistoricoService,
    MaquinariasRepostajesService,
    MaquinariasTacografosService,
    MarcasService,
    NivelMantenimientoAccionService,
    NivelMantenimientoAccionesLangService,
    NivelesDeMantenimientoService,
    NivelesDeMantenimientoTipoService,
    NivelesDeMantenimientoTipoDeAccinService,
    NivelesGrupoAccionService,
    PartesDeTrabajoService,
    PartesDeTrabajoDocumentosService,
    PartesDeTrabajoMaterialesService,
    PartesDeTrabajoMecanicosService,
    PesoYCargaService,
    PrestamosYStockService,
    ProveedoresService,
    ReferenciaDeMaterialesService,
    RegulacionesDeStockService,
    SegurosService,
    StockService,
    TacografosDocService,
    UnidadesDeMedidaService,
    UnidadesDeMedidaTiposDeCombustibleService,
    UsuarioCentroService,
    ValorizaGlobalTableService,
    VistasService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
