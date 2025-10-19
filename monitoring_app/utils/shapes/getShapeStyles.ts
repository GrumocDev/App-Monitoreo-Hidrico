const getStyle = (feature: any, key: string) => {
  
  let fillColor, color = '#3477eb';
  
  if(key === 'DensidadCultivoCoca_2020_Bolivar'){
    fillColor = '#148240';
    color = '#073d1d'
  }else if(key === 'Limite_Bolivar' || key === 'Mapa_de_Tierras_Bolivar' || key === 'ZODES_p'){
    fillColor = '#5ab555';
    color = '#245722';
  }else if(key === 'DistritosMetalogenicos_Bolivar'){
    fillColor = '#949494';
    color = '#535454';
  }else if(key === 'UsoPlaguicidas_ENA2018_Bolivar'){
    const categoria = feature.properties.REPORTE.toUpperCase();
    switch(categoria){
      case 'SI':
        fillColor = '#6ef570';
        color = '#194219';
      case 'NO':
        fillColor = '#e35654';
        color = '#3d1918';
    }
  }else if(key === 'Vertimientos_Mercurio_ENA2018_Bolivar'){
    const categoria = feature.properties.RANGO;
    color = '#8d918f'
    switch (categoria) {
      case 'Menor a 0,112':
        fillColor = '#ffa500';
        break;
      case 'De 0,112 a 0,343':
        fillColor = '#00ff00';
        break;
      case 'De 0,343 a 0,876':
        fillColor = '#ffff00';
        break;
      case 'De 0,876 a 2,514':
        fillColor = '#ffdd00';
          break;
      case 'Mayor a 2,514':
        fillColor = '#8B0000';
        break;
      default:
        fillColor = '#000000';
    }
  }else if(
    key === 'DBO_ENA_2018' || 
    key === 'DQO_ENA2018_Bolivar' || 
    key === 'Fosforo_ENA2014_Bolivar_4326' || 
    key === 'Fosforo_ENA2014_Bolivar' || 
    key === 'Nitrogeno_ENA_2014' || 
    key === 'SST_2018_Bolivar'
  ){
    let categoria;
    if(key === 'DBO_ENA_2018'){
      categoria = feature.properties.DBO.toUpperCase();
    }else if(key === 'DQO_ENA2018_Bolivar'){
      categoria = feature.properties.DQO.toUpperCase();
    }else if(key === 'Fosforo_ENA2014_Bolivar_4326' || key === 'Fosforo_ENA2014_Bolivar'){
      categoria = feature.properties.categoriaP.toUpperCase()
    }else if(key === 'Nitrogeno_ENA_2014'){
      categoria = feature.properties.categoriaN.toUpperCase()
    }else if(key === 'SST_2018_Bolivar'){
      categoria = feature.properties.SST.toUpperCase()
    }
    color = '#8d918f'
    switch (categoria) {
      case 'ALTA':
        fillColor = '#ff0000';
        break;
      case 'MODERADA':
        fillColor = '#ffa500';
        break;
      case 'BAJA':
        fillColor = '#00ff00';
        break;
      case 'MEDIA':
        fillColor = '#ffff00';
        break;
      case 'MEDIA ALTA':
        fillColor = '#ffdd00';
          break;
      case 'MUY ALTA':
        fillColor = '#8B0000';
        break;
      default:
        fillColor = '#000000';
    }
  }

  return {
    fillColor,
    weight: 2,
    opacity: 1,
    color,
    fillOpacity: 0.7,
  };
};

export {
  getStyle
}
