import axios, { AxiosResponse, AxiosError } from "axios";
import { store } from "@/stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'https://localhost:7075/api';

axios.interceptors.request.use(config => {
    const token = store.userStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// axios.interceptors.response.use(async response => {
//     await sleep(1000);
//     return response;
// }, (error: AxiosError) => {
//     const { data, status } = error.response!;
//     switch (status) {
//         case 400:
//             console.error('BAD REQUEST');
//             break;
//         case 401:
//             console.error("UNAUTHORIZED");
//             break;
//         case 404:
//             console.error("NOT FOUND");
//             break;
//         case 500:
//             console.error("SERVER ERROR");
//             break;
//     }

//     return Promise.reject(error);
// });

const responeBody = (response: AxiosResponse) => response.data;

const requests = {
    get: async <T>(url: string) : Promise<T> => await axios.get<T>(url).then(responeBody),
    post: async <T>(url: string, body: {}) : Promise<T> => await axios.post<T>(url, body).then(responeBody),
    put: async <T>(url: string, body: {}) : Promise<T> => await axios.put<T>(url, body).then(responeBody),
    delete: async <T>(url: string) : Promise<T> => await axios.delete<T>(url).then(responeBody)
}

const Auth = {
    login: async (user: UserFormValues) => await requests.post<User>("/Auth/Login", user),
    register: async (user: UserFormValues) => await requests.post<void>('/Auth/Register', user),
    resetPassword: async (resetPassowrd: ResetPasswordValues) => await requests.post<void>('/Auth/ResetPassword', resetPassowrd),
    validateToken: async (validateToken : ValidateToken) => await requests.post<boolean>("/Auth/ValidateToken", validateToken),
    confirmEmail: async (token: string, email: string) => await requests.post<void>(`/Auth/ConfirmEmail?token=${token}&email=${email}`, {}),
    resendEmailConfirm: async (email: string) => await requests.get<void>(`/Auth/ResendEmailConfirmationLink?email=${email}`),
}

const Home = {
    getHomeData: async (userId: string) => {
        var data = await requests.get<HomeInformation>(`/Home/${userId}`);

        console.log(data);

        for (let i = 0; i < data.administrations.length; i++) {  // !Important Resolve typo in the API
            // data.administrations[i].associations = await requests.get<any>(`/Association/administration/${data.administrations[i].id}/associations`);
            data.administrations[i].associations = await requests.get<any>(`/Association/administration/${data.administrations[i].id}/assocaitions`);
        }

        return data;
    },
    sendCounter: async (counter: SendCounter) => await requests.post<void>("/Home/SendCounter", counter)
}

const AdminSettings = {
    getAdministrationStructure: async (administrationID: string) => {
        let administration = await requests.get<Administration>(`/Administration/${administrationID}`);
        let data = {
            id: administration.id,
            name: administration.name,
            associations: []
        }

        let assocaitions = await requests.get<any>(`/Association/administration/${administrationID}/assocaitions`);

        data.associations = assocaitions.map((association: any) => {
            return {
                id: association.id,
                name: association.name,
                apartments: []
            }
        });

        // let apartments = await requests.get<any>(`/Apartment/administration/${administrationID}/apartments`);

        // data.associations.forEach((association: any) => {
        //     association.apartments = apartments.filter((apartment: any) => apartment.associationID === association.id);
        // });

        return data;
    },
    getAssociationStructure: async (associationID: string) => {
        let data = await requests.get<Association>(`/Association/${associationID}`);

        data.apartments = await requests.get<any>(`/Apartment/association/${associationID}/apartments`);

        return data;
    },
}

const AdministratorSettings = {

}

const EmployeeSettings = {
    
}

const agent = {
    Auth,
    Home,
    AdminSettings,
}

export default agent;