import axios from "axios";
import { ContextData, ContextStoreData, ErrorBody, ResponseBody } from "../Types";
import { Bounce, toast } from "react-toastify";

import moment from "moment";

export const getDateTimeString = (date: Date) => {
    if(date){
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }else{
        return ""
    }
}

export const apiRequest = async <ReqBody, ResBody>(
    url: string,
    requestBody: ReqBody | null,
    token: string,
    locale: string,
    type: "get" | "post" | "put" | "delete",
    store: ContextStoreData<ContextData>
): Promise<ResBody | ErrorBody> => {
    const setLoading = (loading: boolean) => {
        store.setContext({
          ...store.context,
          loading: loading
        })
      }
    const headers = {
        "x-auth-token": token,
        "x-locale": locale,
    };
    let response;
    setLoading(true);
    try {
        switch (type) {
            case "get":
                response = await axios.get<ResponseBody<ResBody> | ErrorBody>(
                    url,
                    {
                        headers,
                    }
                );
                break;
            case "post":
                response = await axios.post<ResponseBody<ResBody> | ErrorBody>(
                    url,
                    requestBody,
                    {
                        headers,
                    }
                );
                break;
            case "put":
                response = await axios.put<ResponseBody<ResBody> | ErrorBody>(
                    url,
                    requestBody,
                    {
                        headers,
                    }
                );
                break;
            case "delete":
                response = await axios.delete<
                    ResponseBody<ResBody> | ErrorBody
                >(url, {
                    headers,
                });
                break;
            default:
                //processAlert({ status: false } as ErrorBody);
                return { status: false } as ErrorBody;
        }
        setLoading(false);
        //processAlert(response.data);
        if (response.data.status) {
            return response.data.resource;
        } else {
            return response.data;
        }
    } catch (err) {
        setLoading(false);
        if (axios.isAxiosError(err)) {
            //processAlert(err.response?.data);
            return err.response?.data;
        }
        //processAlert({ status: false } as ErrorBody);
        return { status: false } as ErrorBody;
    }
};

export const checkForError = <T extends Object>(response: T | ErrorBody) => {
    if ("status" in response && !response.status) {
        return true;
    }
    return false;
};

export const showAlert = (
    text: string,
    type: "info" | "success" | "warning" | "error"
) => {
    toast(text, {
        type,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
};

export const processAlert = <T>(response: ResponseBody<T> | ErrorBody) => {
    console.log(response);
    if (response.status) {
        if (response.popupMessage) {
            showAlert(response.popupMessage, "success");
        } else {
            showAlert("Your action has been successful", "success");
        }
    } else {
        if (response.popupMessage) {
            showAlert(response.popupMessage, "error");
        } else {
            showAlert("Unknown Error Occured", "error");
        }
    }
};
