class BaseContact {
    firstName?: string
    lastName?: string
    age?: number
    photo?: string
}

class Contacts extends BaseContact {
    id!: string
}

class ContactReq extends BaseContact {
}

export { ContactReq }
export default Contacts