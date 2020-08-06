/**
 * Model class for user login
 */
export class User {
  constructor(
    public name: string,
    public pass?: string,
    public id?: string,
    public authtoken?: string,
    public logoutToken?: string,
    public csrfToken?: string,
  ){}
}
