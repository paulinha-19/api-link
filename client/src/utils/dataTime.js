export const formatDataTime = () => {
    const data = "2023-02-17T13:26:58.979Z";
    const newFormat = new Date(data);
    const dataFormated = newFormat.toLocaleDateString('pt-BR');
    const hoursFormated = newFormat.toLocaleTimeString('pt-BR');
    return `${dataFormated} ${hoursFormated}`
}

