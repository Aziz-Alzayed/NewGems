export enum RequestDataType {
    FormData,
    Entity
}

function createFormData<T extends object>(data: T): FormData {
    const formDataToSend = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            formDataToSend.append(key, value);
        }
    });
    //// Just for debugging
    //for (const [key, value] of formDataToSend.entries()) {
    //    console.log(key, value);
    //}

    return formDataToSend;
}