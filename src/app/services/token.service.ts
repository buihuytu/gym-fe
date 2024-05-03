import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isExpired$ = new BehaviorSubject<boolean>(true);
  constructor() {}

  // Lưu token vào localStorage với thời gian hết hạn
  saveToken(token: string, expiresIn: number): void {
    const expirationTime = Date.now() + expiresIn * 1000; // Chuyển đổi expiresIn thành mili giây
    localStorage.setItem('gym_token', token);
    localStorage.setItem('gym_token_expiration', expirationTime.toString());

    // Tự động xóa token khi nó hết hạn
    setTimeout(() => {
      this.removeToken();
    }, expiresIn * 1000);
  }

  // Lấy token từ localStorage
  getToken(): string | null {
    const tokenExpiration = localStorage.getItem('gym_token_expiration');
    if (!tokenExpiration || Date.now() > parseInt(tokenExpiration, 10)) {
      // Xóa token nếu đã hết hạn
      this.removeToken();
      return null;
    }
    return localStorage.getItem('gym_token');
  }

  // Xóa token khỏi localStorage
  removeToken(): void {
    localStorage.removeItem('gym_token');
    localStorage.removeItem('gym_token_expiration');
    this.isExpired$.next(true);
  }

  getExpiration(): number {
    const tokenExpiration = localStorage.getItem('gym_token_expiration');
    if (!tokenExpiration) {
      this.isExpired$.next(true);
      return 0;
    }
    this.isExpired$.next(Date.now() > parseInt(tokenExpiration, 10));
    return parseInt(tokenExpiration, 10);
  }
}
