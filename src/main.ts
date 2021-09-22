import { append, any, contains } from 'ramda'

let hello:string = `world`

const getFullName = (name: string, surname:string):string => {
    return name + ` ` + surname
}

console.log(getFullName(`Domino`, `Jachaś`))

type ID = string
type PopularTag = string
type MaybePopularTag = PopularTag | null

const popularTags: PopularTag[] = [`cats`, `puppies`]

const catsTag: MaybePopularTag = null

// interface UserInterface {
//     id: ID,
//     firstName: string
//     lastName: string
//     age?: number
//     getMessage(): string
// }

// const user: UserInterface = {
//     id: '0',
//     name: `Kamil`,
//     surname: `Zdun`,
//     age: 27,
//     getMessage() {
//         return `Hello I'm ` + this.name + ` ` + this.surname
//     }
// }

// const user2: UserInterface = {
//     id: `1`,
//     name: "Lukasz",
//     surname: "Pirat",
//     getMessage() {
//         return `Hello I'm ` + this.name + " " + this.surname
//     }
// }

// console.log(user.getMessage())

// let pageName: string | number = `1`

// let errorMessage: string | null = null

// let user3: UserInterface | null = null

// const doSomething = ():void => {
//     console.log(`Do something`)
// }

// const someElement = document.querySelector(`.foo`)

// someElement.addEventListener(`blur`, (event) => {
//     const target = event.target as HTMLInputElement
//     console.log("event ", event)
// })

interface UserInterface<T, V> {
    // id: number
    // firstName: string
    // lastName: string
    // readonly unchangableId: string
    // getFullName(): string
    // getUnchangebleId():string
    name: string
    data: T
    meta: V
}

class User implements UserInterface<{meta: string}, string> {
    
    name:string
    private id: string
    private firstName: string
    private lastName: string
    private readonly unchangableId: string
    private age?: number
    private static readonly maxAge = 100
    data: {
        meta: `foo`
    }
    meta: string
    

    constructor(id: string, firstName: string, lastName:string, age?:number) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.name = firstName + ` ` + lastName
        this.age = age
        this.unchangableId = (id as unknown) as string + `-` + 
        firstName.toLowerCase() + `-` + lastName.toLowerCase()
    }

    getFullName():string {
        return this.firstName + ` ` + this.lastName
    }

    getUnchangebleId():string {
        return this.unchangableId
    }
}

class Admin extends User {
    private editor: string

    setEditor(editor: string) {
        this.editor = editor
    }

    getEditor():string {
        return this.editor
    }

}

const konrad = new User(`1`, `Konrad`, `Markowski`)
console.log(konrad.getFullName())
console.log(konrad.getUnchangebleId())

const admin = new Admin(`0`, `Adam`, `Adminsky`)
console.log(admin.getUnchangebleId())
admin.setEditor(`vim`)
console.log(admin.getEditor())

const addId = <T extends object>(obj: T) => {
    const id = Math.random().toString(16)
    return {
        ...obj, 
        id
    }
}


const jacek:UserInterface<{ meta: string }, string> = {
    name: `Jacek Gacek`,
    data: {
        meta: `foo`
    },
    meta: `meta bar`
}

const marek: UserInterface<string[], string> = {
    name: `Marek Garek`,
    data: [`foo`, `bar`, `baz`],
    meta: `meta baz`
}

const result = addId<UserInterface<{ meta: string }, string>>(jacek)
console.log(result)

const result2 = addId<UserInterface<string[], string>>(marek)
console.log(result2)

const updatedList = append<string>(`baz`, [`foo`, `bar`])
console.log(updatedList)

const searchStr = `foo`
const _hasSearchedString = any<string>((el:string) => el.search(searchStr), [`fooooooo`, `bar`, `baz`])
console.log(_hasSearchedString)

// const statuses = {
//     notStarted: 0,
//     inProgress: 1,
//     done: 2
// }

// console.log(statuses.inProgress)

enum StatusEnum {
    NotStarted = "Status = Not Started", 
    InProgress = "Status = In Progress",
    Done = "Status = Done"
}

interface Task {
    id:string
    status: StatusEnum
}

const task:Task = {
    id: `1`,
    status: StatusEnum.NotStarted
}
console.log(`id: ` + task.id + `, ` + task.status)

let status: StatusEnum = StatusEnum.NotStarted
status = StatusEnum.Done
console.log(status)