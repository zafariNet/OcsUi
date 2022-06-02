import { LogedInUserViewModel } from "../service-proxies/service-proxies";


const TOKEN_KEY = 'token';
const USER_KEY = 'current_user';
const REFRESH_TOKEN= 'refresh_Token'
export class LocalStorageService {
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
  removeRefreshToken(){
    localStorage.removeItem(REFRESH_TOKEN);
  }
  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  public setCurrentUser(currentUser: LogedInUserViewModel) {
    let user = JSON.stringify(currentUser);
    localStorage.setItem(USER_KEY, user);
  }
  public getCurrentUser(): any {

  }
  public removeCurrentUser(): void {
    localStorage.removeItem(USER_KEY)
    
  }
  public saveRefreshToken(token : string)
  {
      localStorage.setItem(REFRESH_TOKEN,token);
  }
  public getRefreshToken(): string
  {
      return localStorage.getItem(REFRESH_TOKEN)!;
  }
}
