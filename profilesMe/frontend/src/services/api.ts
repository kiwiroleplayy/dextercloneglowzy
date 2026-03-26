import { backendUrl } from '@/backendUrl';
import {
  User,
  Link as LinkType,
} from '../types';

export const BURL = backendUrl
export const GOOGLE_AUTH = `${backendUrl}/auth/google`
export const AUTH = `${backendUrl}/auth/me`

export const API_URL = `${backendUrl}/api`;


export const apiService = {
  async googleLogin() {
    window.location.href = GOOGLE_AUTH;
  },

  async getUser(username: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/${username}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  async getUserLinks(userId: number): Promise<LinkType[]> {
    const response = await fetch(`${API_URL}/links/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch links');
    return response.json();
  },

  async createLink(link: { userId: number | string; title: string; url: string }): Promise<LinkType> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(link)
    });
    if (!response.ok) throw new Error('Failed to create link');
    return response.json();
  },

  async updateLink(id: number, link: { title: string; url: string }): Promise<LinkType> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/links/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(link),
    });

    if (!response.ok) {
      throw new Error('Failed to update link');
    }

    return response.json(); // Ensure the API response includes the updated link data
  }
,

  async deleteLink(id: number): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/links/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete link');
  },

  async reorderLinks(userId: number, linkIds: number[]): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/links/reorder/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ linkIds })
    });
    if (!response.ok) throw new Error('Failed to reorder links');
  }
};