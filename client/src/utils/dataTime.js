export const formatDataTime = (data) => {
    const newFormat = new Date(data);
    const dataFormated = newFormat.toLocaleDateString('pt-BR');
    const hoursFormated = newFormat.toLocaleTimeString('pt-BR');
    return `${dataFormated} ${hoursFormated}`
}



