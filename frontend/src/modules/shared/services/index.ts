import axios from "axios";
import { ContextData, ContextStoreData, ErrorBody, ResponseBody } from "../Types";
import moment from "moment";
import dayjs from "dayjs";

export const getDateTimeString = (date: Date) => {
    if(date){
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }else{
        return ""
    }
}

export const getReadableString = (timestamp: number) => {
    if(timestamp){
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',    
            month: 'numeric',     
            day: '2-digit', 
            hour: 'numeric',
            minute: '2-digit', 
            hour12: true
          });
    }else{
        return ""
    }
}

export const calculateDuration = (startTime: number, endTime: number) => {
    const start = dayjs.unix(startTime); 
    const end = dayjs.unix(endTime);
  
    const diffMinutes = end.diff(start, "minutes");
  
    if (diffMinutes >= 1440) {
      return `${Math.floor(diffMinutes / 1440)} days`;
    } else if (diffMinutes >= 60) {
      return `${Math.floor(diffMinutes / 60)} hours`;
    } else {
      return `${diffMinutes} minutes`;
    }
};

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
                return { status: false } as ErrorBody;
        }
        setLoading(false);
        if (response.data.status) {
            return response.data.resource;
        } else {
            return response.data;
        }
    } catch (err) {
        setLoading(false);
        if (axios.isAxiosError(err)) {
            return err.response?.data;
        }
        return { status: false } as ErrorBody;
    }
};

export const checkForError = <T extends Object>(response: T | ErrorBody) => {
    if ("status" in response && !response.status) {
        return true;
    }
    return false;
};
