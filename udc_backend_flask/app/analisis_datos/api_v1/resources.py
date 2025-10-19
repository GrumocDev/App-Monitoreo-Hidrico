from collections import defaultdict
from flask import request, Blueprint, jsonify
from flask_jwt_extended import jwt_required
from flask_restful import Api, Resource
import pandas as pd
import numpy as np
from sqlalchemy import null

from app.common.decorators import role_required

from app.nodos.models import  DatoNodo
import app.script.analisis_function as af 

analisis_v1_bp = Blueprint('analisis_v1_bp',__name__)
api = Api(analisis_v1_bp)

class correlacionResource(Resource):
    """
    Parametros:
    1. Boyas(nodos)
    2. Variables Ambientales

    """
    # @jwt_required()
    # @role_required('user')
    def post(self):
        # Busqueda de datos por boyas para convertir en dataframe - selecion de variables
        #Llamar a la funcion graficar_correlacion(df)
        resp = request.get_json()
        
        columnas = [
            DatoNodo.temperatura,
            DatoNodo.ph,
            DatoNodo.turbidez,
            DatoNodo.oxigeno_disuelto,
            DatoNodo.conductividad,
            DatoNodo.solido_disuelto
            ]
        
        if "nodo_id" not in resp:
            return {"message": "El campo 'nodo_id' es obligatorio"}, 400

        columnas_cliente = resp.get("columnas")
        if columnas_cliente is None:
            return {"message": "El campo 'columnas' es obligatorio en el JSON"}, 400

        query = DatoNodo.query.with_entities(*columnas).filter(DatoNodo.nodo_id == resp['nodo_id'])
        datosNodos = query.all()    

        if datosNodos is None:
           return {"message": "Datos not found"}, 404
        
        data = [dict(zip([column.name for column in columnas], row)) for row in datosNodos]
        df = pd.DataFrame(data)

        columnas_disponibles = df.columns.tolist()

        faltantes = [col for col in columnas_cliente if col not in columnas_disponibles]
        if faltantes:
            return {
                "message": f"Las siguientes columnas no se encuentran en los datos: {faltantes}",
                "columnas_disponibles": columnas_disponibles
            }, 400
        
        
        result = af.calcular_correlacion(df[columnas_cliente])
               
        return jsonify({"data":result.to_json(orient="records")})
    
api.add_resource(correlacionResource,'/api/v1/analisis/correlacion',endpoint='analisis_correlacion_resource')

class histogramasResource(Resource):
    """
    Parametros:
    1. Boyas(nodos)
    2. Variables ambientales a interpolar
  
    """
    # @jwt_required()
    # @role_required('user')
    def post(self):
        # Busqueda de datos por boyas para convertir en dataframe - selecion de variables
        #Llamar a la funcion plot_histogramas_boya(df_boya, boya_name, columnas_interpolar)
        resp = request.get_json()
        nodos_id = resp.get('nodos_id', [])
        columnas_seleccionadas = resp.get('columnas', [])

        columnas = [
            DatoNodo.nodo_id,
            DatoNodo.temperatura,
            DatoNodo.ph,
            DatoNodo.turbidez,
            DatoNodo.oxigeno_disuelto,
            DatoNodo.conductividad,
            DatoNodo.solido_disuelto
            ]
        
        query = DatoNodo.query.with_entities(*columnas).filter(DatoNodo.nodo_id.in_(nodos_id))
        
        datosNodos = query.all()    

        if not datosNodos:
            return {"message": "No se encontraron datos para los nodos proporcionados"}, 404
        
        # Crear un diccionario para almacenar los DataFrames por nodo
        data_por_nodo = defaultdict(list)

        # Agrupar los datos por nodo
        for row in datosNodos:
            nodo_id = row[0]  # `nodo_id` está en la primera posición
            data_por_nodo[nodo_id].append(row[1:])  # Guardamos el resto de las columnas        

         # Convertir los datos agrupados a DataFrames
        dfs_por_nodo = {
            nodo_id: pd.DataFrame(data, columns=[column.name for column in columnas[1:]])  # Excluimos nodo_id
            for nodo_id, data in data_por_nodo.items()
        }

        # Filtrar las columnas seleccionadas
        dfs_filtrados = {
            nodo_id: df[columnas_seleccionadas]
            for nodo_id, df in dfs_por_nodo.items()
        }

        result = af.calcular_histogramas(dfs_filtrados,columnas_seleccionadas)

        resultados = convertir_ndarray_a_lista(result)
       
        return jsonify(resultados)

    
api.add_resource(histogramasResource,'/api/v1/analisis/histograma',endpoint='analisis_histograma_resource')

class autocorrelacionResource(Resource):
    """
    Parametros:
    1. Boyas(nodos)
    2. Nombres boyas(nodos)
    3. Nombres Variables ambientales
    4. Dias de autocorrelacion
    """
    # @jwt_required()
    # @role_required('user')
    def post(self):
        # Busqueda de datos por boyas para convertir en dataframe - selecion de variables
        #lags = 144*dias
        #Llamar a la funcion graficar_autocorrelacion(df, vars, boya_name, lags, tiempo)
        resp = request.get_json()
        nodo_id = resp.get('nodo_id', [])
        columnas_seleccionadas = resp.get('columnas', [])
        dias = resp.get('dias', 1)

        columnas = [
            DatoNodo.temperatura,
            DatoNodo.ph,
            DatoNodo.turbidez,
            DatoNodo.oxigeno_disuelto,
            DatoNodo.conductividad,
            DatoNodo.solido_disuelto
            ]

        query = DatoNodo.query.with_entities(*columnas).filter(DatoNodo.nodo_id == nodo_id)
        datosNodos = query.all()    

        if not datosNodos:
            return {"message": "No se encontraron datos para los nodos proporcionados"}, 404
        
        data = [dict(zip([column.name for column in columnas], row)) for row in datosNodos]
        df = pd.DataFrame(data)
        result = af.calcular_autocorrelacion(df,columnas_seleccionadas,dias)
        resultados = convertir_ndarray_a_lista(result)
        return jsonify(resultados)
    
api.add_resource(autocorrelacionResource,'/api/v1/analisis/autocorrelacion',endpoint='analisis_autocorrelacion_resource')

class correlacionCruzadaResource(Resource):
    """
    Parametros:
    1. Boya 1(nodo 1)
    2. Boya 2(nodo 2)
    3. Nombres Variables ambientales  - Nodo 1
    4. Nombres Variables ambientales  - Nodo 2
    """
    # @jwt_required()
    # @role_required('user')
    def post(self):
        # Busqueda de datos por boyas para convertir en dataframe - selecion de variables
        #Llamar a la funcion graficar_correlacion_cruzada(df1, var1, df2, var2, boya1, boya2)
        resp = request.get_json()
        nodo_id_1 = resp.get('nodo_1', [])
        nodo_id_2 = resp.get('nodo_2', [])
        columna_1 = resp.get('columna_1', [])
        columna_2 = resp.get('columna_2', [])

        columnas = [
            DatoNodo.temperatura,
            DatoNodo.ph,
            DatoNodo.turbidez,
            DatoNodo.oxigeno_disuelto,
            DatoNodo.conductividad,
            DatoNodo.solido_disuelto
            ]

        query1 = DatoNodo.query.with_entities(*columnas).filter(DatoNodo.nodo_id == nodo_id_1)
        datosNodos1 = query1.all()

        query2 = DatoNodo.query.with_entities(*columnas).filter(DatoNodo.nodo_id == nodo_id_2)
        datosNodos2 = query2.all()    

        if not datosNodos1:
            return {"message": "No se encontraron datos para los nodos proporcionados"}, 404
        
        if not datosNodos2:
            return {"message": "No se encontraron datos para los nodos proporcionados"}, 404
        
        data1 = [dict(zip([column.name for column in columnas], row)) for row in datosNodos1]
        data2 = [dict(zip([column.name for column in columnas], row)) for row in datosNodos2]
        
        df1 = pd.DataFrame(data1)
        df2 = pd.DataFrame(data2)

        min_len = min(len(df1[columna_1]), len(df2[columna_2]))
        df1 = df1.iloc[:min_len]
        df2 = df2.iloc[:min_len]

        
        result = af.calcular_correlacion_cruzada(df1,columna_1,df2,columna_2)
        resultados = convertir_ndarray_a_lista(result)
        resultados["correlacion_cruzada"] = resultados["correlacion_cruzada"][:100]
        resultados["lags"] = resultados["lags"][:100]
        return jsonify(resultados)
    
api.add_resource(correlacionCruzadaResource,'/api/v1/analisis/correlacioncruzada',endpoint='analisis_correlacioncruzada_resource')

class transformadaFourierResource(Resource):
    """
    Parametros:
    1. Boya 1(nodo 1)
    2. Nombres Variables ambientales
    3. amplitud
    """
    # @jwt_required()
    # @role_required('user')
    def post(self):
        # Busqueda de datos por boyas para convertir en dataframe - selecion de variables
        #Llamar a la funcion graficar_transformada_fourier(df, var, amplitud_grafica=None)
        resp = request.get_json()
        nodo_id = resp.get('nodo_id', [])
        columna = resp.get('columna', [])

        columnas = [
            DatoNodo.temperatura,
            DatoNodo.ph,
            DatoNodo.turbidez,
            DatoNodo.oxigeno_disuelto,
            DatoNodo.conductividad,
            DatoNodo.solido_disuelto
            ]

        query = DatoNodo.query.with_entities(*columnas).filter(DatoNodo.nodo_id == nodo_id)
        datosNodos = query.all()    

        if not datosNodos:
            return {"message": "No se encontraron datos para los nodos proporcionados"}, 404
        
        data = [dict(zip([column.name for column in columnas], row)) for row in datosNodos]
        df = pd.DataFrame(data)
        result = af.calcular_transformada_fourier(df,columna)
        resultados = convertir_ndarray_a_lista(result)
        resultados["frecuencias"] = resultados["frecuencias"][:100]
        resultados["amplitudes"] = resultados["amplitudes"][:100]
        return jsonify(resultados)
    
api.add_resource(transformadaFourierResource,'/api/v1/analisis/transformadafourier',endpoint='analisis_transformadafourier_resource')

class coherenciaResource(Resource):
    """
    Parametros:
    1. Boya 1(nodo 1)
    2. Boya 2(nodo 2)
    3. Nombres Variables ambientales  - Nodo 1
    4. Nombres Variables ambientales  - Nodo 2
    """
    # @jwt_required()
    # @role_required('user')
    def post(self):
        # Busqueda de datos por boyas para convertir en dataframe - selecion de variables
        #Llamar a la funcion graficar_coherencia(df1, var1, df2, var2, boya1, boya2)
        resp = request.get_json()
        nodo_id_1 = resp.get('nodo_1', [])
        nodo_id_2 = resp.get('nodo_2', [])
        columna_1 = resp.get('columna_1', [])
        columna_2 = resp.get('columna_2', [])

        columnas = [
            DatoNodo.temperatura,
            DatoNodo.ph,
            DatoNodo.turbidez,
            DatoNodo.oxigeno_disuelto,
            DatoNodo.conductividad,
            DatoNodo.solido_disuelto
            ]

        query1 = DatoNodo.query.with_entities(*columnas).filter(DatoNodo.nodo_id == nodo_id_1)
        datosNodos1 = query1.all()

        query2 = DatoNodo.query.with_entities(*columnas).filter(DatoNodo.nodo_id == nodo_id_2)
        datosNodos2 = query2.all()    

        if not datosNodos1:
            return {"message": "No se encontraron datos para los nodos proporcionados"}, 404
        
        if not datosNodos2:
            return {"message": "No se encontraron datos para los nodos proporcionados"}, 404
        
        data1 = [dict(zip([column.name for column in columnas], row)) for row in datosNodos1]
        data2 = [dict(zip([column.name for column in columnas], row)) for row in datosNodos2]
        
        df1 = pd.DataFrame(data1)
        df2 = pd.DataFrame(data2)

        min_len = min(len(df1[columna_1]), len(df2[columna_2]))
        df1 = df1.iloc[:min_len]
        df2 = df2.iloc[:min_len]

        
        result = af.calcular_coherencia(df1,columna_1,df2,columna_2)
        resultados = convertir_ndarray_a_lista(result)
        return jsonify(resultados)
    
api.add_resource(coherenciaResource,'/api/v1/analisis/coherencia',endpoint='analisis_coherencia_resource')

class correlacionPuntosResource(Resource):
    """
    Parametros:
    1. Boya 1(nodo 1)
    2. Boya 2(nodo 2)
    3. Nombres Variables ambientales  - Nodo 1
    4. Nombres Variables ambientales  - Nodo 2
    """
    # @jwt_required()
    # @role_required('user')
    def post(self):
        # Busqueda de datos por boyas para convertir en dataframe - selecion de variables
        #Llamar a la funcion graficar_coherencia(df1, var1, df2, var2, boya1, boya2)
        resp = request.get_json()
        nodo_id_1 = resp.get('nodo_1', [])
        nodo_id_2 = resp.get('nodo_2', [])
        columna_1 = resp.get('columna_1', [])
        columna_2 = resp.get('columna_2', [])

        columnas = [
            DatoNodo.temperatura,
            DatoNodo.ph,
            DatoNodo.turbidez,
            DatoNodo.oxigeno_disuelto,
            DatoNodo.conductividad,
            DatoNodo.solido_disuelto
            ]

        query1 = DatoNodo.query.with_entities(*columnas).filter(DatoNodo.nodo_id == nodo_id_1)
        datosNodos1 = query1.all()

        query2 = DatoNodo.query.with_entities(*columnas).filter(DatoNodo.nodo_id == nodo_id_2)
        datosNodos2 = query2.all()    

        if not datosNodos1:
            return {"message": "No se encontraron datos para los nodos proporcionados"}, 404
        
        if not datosNodos2:
            return {"message": "No se encontraron datos para los nodos proporcionados"}, 404
        
        data1 = [dict(zip([column.name for column in columnas], row)) for row in datosNodos1]
        data2 = [dict(zip([column.name for column in columnas], row)) for row in datosNodos2]
        
        df1 = pd.DataFrame(data1)
        df2 = pd.DataFrame(data2)

        min_len = min(len(df1[columna_1]), len(df2[columna_2]))
        df1 = df1.iloc[:min_len]
        df2 = df2.iloc[:min_len]

        
        correlacion, puntos = af.calcular_correlacion_puntos(df1,columna_1,df2,columna_2)
        resultados = {
            "correlacion": float(correlacion),
            "puntos":{
                columna_1:puntos[0][:500],
                columna_2:puntos[1][:500]
            }
        }
        return jsonify(resultados)
    
api.add_resource(correlacionPuntosResource,'/api/v1/analisis/correlacionpuntos',endpoint='analisis_correlacion_puntos_resource')

# Función para convertir recursivamente ndarray a listas
def convertir_ndarray_a_lista(data):
    if isinstance(data, np.ndarray):
        return data.tolist()
    elif isinstance(data, dict):
        return {k: convertir_ndarray_a_lista(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convertir_ndarray_a_lista(i) for i in data]
    else:
        return data