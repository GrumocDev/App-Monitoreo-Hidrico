import numpy as np
import pandas as pd
from statsmodels.tsa.stattools import ccf
from matplotlib.mlab import cohere


def calcular_correlacion(df:pd.DataFrame):
    """
    Calcula la matriz de correlación para las variables de un DataFrame.

    Parámetros:
    ----------
    df : DataFrame
        DataFrame que contiene los datos para los que se calculará la matriz de correlación.

    Retorna:
    -------
    DataFrame
        Matriz de correlación entre las columnas numéricas del DataFrame.
    """
    return df.corr()

# Función para calcular histogramas de las variables deseadas en una boya
def calcular_histogramas(boyas_dict, columnas_interpolar, boya_name=None):
    """
    Calcula los histogramas de variables seleccionadas para una boya específica o para todas las boyas.

    Parámetros:
    ----------
    boyas_dict : dict
        Diccionario que contiene los datos de las boyas, donde cada clave es el nombre de una boya y cada valor
        es un DataFrame con datos de esa boya.

    columnas_interpolar : list
        Lista de nombres de columnas de las variables que se desean calcular en los histogramas.

    boya_name : str, opcional
        Nombre de la boya para la cual se desea calcular los histogramas. Si no se proporciona, la función calcula
        los histogramas de las variables especificadas para todas las boyas.

    Retorna:
    -------
    dict
        Un diccionario donde las claves son los nombres de las boyas y los valores son diccionarios con las variables
        seleccionadas como claves y los datos del histograma como valores (frecuencias y bins).
    """
    histogramas = {}

    # Si no se especifica una boya, calcular para todas
   
    for boya_name, df_boya in boyas_dict.items():
        histogramas[boya_name] = calcular_histogramas_boya(df_boya, columnas_interpolar)
   

    return histogramas


def calcular_histogramas_boya(df_boya, columnas_interpolar):
    """
    Calcula los histogramas para un conjunto de variables en una boya específica.

    Parámetros:
    ----------
    df_boya : DataFrame
        DataFrame que contiene los datos de la boya específica para la cual se calcularán los histogramas.

    columnas_interpolar : list
        Lista de nombres de columnas de las variables para las que se desea calcular los histogramas.

    Retorna:
    -------
    dict
        Un diccionario donde las claves son las variables seleccionadas y los valores son tuplas de dos listas:
        frecuencias y bins para cada histograma.
    """
    histogramas_boya = {}
    for columna in columnas_interpolar:
        frecuencias, bins = np.histogram(df_boya[columna].dropna(), bins=30)
        histogramas_boya[columna] = {"frecuencias": frecuencias, "bins": bins}
    return histogramas_boya

def calcular_autocorrelacion(df, vars, dias):
    """
    calcular los ticks y etiquetas para autocorrelación.

    Parámetros:
    ----------
    df : pandas.DataFrame
        DataFrame que contiene los datos de las boyas, donde cada columna representa una variable.

    vars : list
        Lista de nombres de columnas en el DataFrame para las cuales se calculará la autocorrelación.

  
    Retorna:
    -------
    resultados : dict
        Diccionario que contiene las variables seleccionadas como claves y sus correspondientes
        ticks y etiquetas calculadas como valores.
    """
    resultados = {}
    lags = 144 * dias  # Asumiendo 144 mediciones por día (cada 10 minutos)

    # Calcular ticks y etiquetas para cada variable seleccionada
    for var in vars:
        ticks, labels = calcular_etiquetas_tiempo(dias, lags)
        resultados[var] = {"ticks": ticks, "labels": labels}

    return resultados
   

def calcular_etiquetas_tiempo(tiempo, lags):
    """
    Calcula las etiquetas y ticks para el eje x de una gráfica basados en el tiempo y la cantidad de lags.

    La función determina el intervalo de tiempo por lag y genera ticks y etiquetas adecuadas para el eje x
    dependiendo del valor de `tiempo`. Se utiliza para facilitar la visualización de datos temporales en gráficos.

    Parámetros:
    ----------
    tiempo : int
        Un valor entero que representa la periodicidad del tiempo.
        - 1: 4 horas por lag.
        - 2: 8 horas por lag.
        - 3: 12 horas por lag.
        - 4 o mayor: el intervalo es en días.

    lags : int
        El número total de lags para calcular los ticks y etiquetas correspondientes.

    Retorna:
    -------
    ticks : numpy.ndarray
        Un array de ticks que indica las posiciones en el eje x donde se deben colocar las etiquetas.

    labels : list
        Una lista de strings que representan las etiquetas a mostrar en el eje x,
        formateadas en horas o días según el valor de `tiempo`.
    """
    # Definir el intervalo de tiempo por lag según el valor de 'tiempo'
    if tiempo == 1:
        horas_por_lag = 4
        intervalo_por_lag = lags / horas_por_lag  # En días
    elif tiempo == 2:
        horas_por_lag = 8
        intervalo_por_lag = lags / horas_por_lag  # En días
    elif tiempo == 3:
        horas_por_lag = 12
        intervalo_por_lag = lags / horas_por_lag  # En días
    else:
        # Para tiempo >= 4, el intervalo es directamente en días
        intervalo_por_lag = tiempo / lags

    # Generar ticks y etiquetas para el eje x
    num_ticks = 6  # Número de etiquetas a mostrar
    ticks = np.linspace(0, lags, num_ticks)  # Lags donde se pondrán las etiquetas
    labels = [
        f"{tick  * (num_ticks/intervalo_por_lag) * 1:.1f} horas" if tiempo < 4 else f"{tick * intervalo_por_lag:.2f} días"
        for tick in ticks
    ] # tick  * (num_ticks/intervalo_por_lag) * 1:.1f organiza los nombres delas etiquetas en el eje x para su correcta visualizacion en horas

    return ticks, labels

def calcular_correlacion_puntos(df1, var1, df2, var2):
    """
    Calcula la correlación entre dos variables de diferentes DataFrames y devuelve
    los puntos de los datos, además del valor de la correlación.

    Parámetros:
    ----------
    df1 : DataFrame
        El primer DataFrame que contiene la variable `var1`.

    var1 : str
        Nombre de la variable en `df1` que se quiere comparar.

    df2 : DataFrame
        El segundo DataFrame que contiene la variable `var2`.

    var2 : str
        Nombre de la variable en `df2` que se quiere comparar.

    
    Retorna:
    -------
    correlation : float
        El valor de la correlación entre las dos variables.

    puntos : tuple
        Tupla que contiene dos listas: los valores de las dos variables seleccionadas
        para cada punto (X, Y) en el scatter plot.
    """
    # Calcular la correlación entre las dos variables
    correlation = df1[var1].corr(df2[var2])

    # Obtener los puntos de las dos variables
    puntos = (df1[var1].to_list(), df2[var2].to_list())

    return correlation, puntos


def calcular_correlacion_cruzada(df1, var1, df2, var2):
    """
    Calcula la correlación cruzada entre dos variables de diferentes boyas.

    Parámetros:
    ----------
    df1 : DataFrame
        DataFrame que contiene la primera variable.
    var1 : str
        Nombre de la variable en el primer DataFrame cuyo comportamiento se va a analizar.
    df2 : DataFrame
        DataFrame que contiene la segunda variable.
    var2 : str
        Nombre de la variable en el segundo DataFrame cuyo comportamiento se va a analizar.
    boya1 : str
        Nombre de la primera boya, que se utiliza para etiquetar el gráfico.
    boya2 : str
        Nombre de la segunda boya, que se utiliza para etiquetar el gráfico.

    Retorna:
    -------
    dict
        Diccionario que incluye:
        - "lags": Lags en términos de meses.
        - "correlacion_cruzada": Valores de correlación cruzada.
    """
    # Calcular la correlación cruzada
    cross_corr = ccf(df1[var1], df2[var2])

    # Determinar el número de lags que queremos mostrar
    num_lags = len(cross_corr)

    # Convertir lags a meses, sabiendo que 1 mes equivale a 4320 lags
    lags_en_meses = np.linspace(0, num_lags, num_lags) / 4320  # 4320 lags por mes

    # Retornar los datos calculados en un diccionario
    return {
        "lags": lags_en_meses,
        "correlacion_cruzada": cross_corr
    }

def calcular_transformada_fourier(df, var):
    """
     Calcula la Transformada de Fourier (FFT) de una variable de un DataFrame.

    Parámetros:
    ----------
    df : pandas.DataFrame
        DataFrame que contiene la variable a analizar.

    var : str
        Nombre de la columna en el DataFrame que representa la variable de interés.

    Retorna:
    -------
    dict
        Un diccionario que contiene:
        - "frecuencias": Array con las frecuencias calculadas.
        - "amplitudes": Array con las amplitudes correspondientes.
    """
    # Centrar los datos en torno a la media
    centered_data = df[var] - np.mean(df[var])
    fft_result = np.fft.fft(centered_data)
    # Obtener frecuencias asociadas
    frecuencias = np.fft.fftfreq(len(centered_data), d=(10 / (60 * 24)))  # Intervalo de 10 minutos en días
    amplitudes = np.abs(fft_result)  # Magnitud del espectro
    return {"frecuencias": frecuencias, "amplitudes": amplitudes}

def calcular_coherencia(df1, var1, df2, var2, NFFT=256, Fs=1):
    """
    Calcula la coherencia espectral entre dos variables de diferentes DataFrames.

    Parámetros:
    ----------
    df1 : pandas.DataFrame
        DataFrame que contiene los datos de la primera boya.

    var1 : str
        Nombre de la variable en el primer DataFrame cuya coherencia se desea calcular.

    df2 : pandas.DataFrame
        DataFrame que contiene los datos de la segunda boya.

    var2 : str
        Nombre de la variable en el segundo DataFrame cuya coherencia se desea calcular.

    NFFT : int, opcional
        Número de puntos para calcular la transformada rápida de Fourier. Por defecto es 256.

    Fs : float, opcional
        Frecuencia de muestreo de los datos. Por defecto es 1 Hz.

    Retorna:
    -------
    dict
        Diccionario con los datos calculados:
        - 'frecuencias': las frecuencias asociadas.
        - 'coherencia': la coherencia espectral para cada frecuencia.
    """
    # Calcular la coherencia
    Cxy, f = cohere(df1[var1], df2[var2], NFFT=NFFT, Fs=Fs)
    return {
        'frecuencias': f,
        'coherencia': Cxy
    }