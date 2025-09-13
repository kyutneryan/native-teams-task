import { LogInReqData, LogInResData } from "@/models/auth";
import $apiClient from "..";

export class AuthService {
  static login(data: LogInReqData) {
    return $apiClient.post<LogInResData>("/auth/login", data);
  }
}
