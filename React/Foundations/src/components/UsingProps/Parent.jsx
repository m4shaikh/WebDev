import Child from "./Child"
import styles from './UsingProps.module.css'

const Parent = () => {
    const user = {
        "id": 1,
        "name": "Zara Khan",
        "email": "zara.khan47@example.com",
        "age": 25,
        "city": "Hyderabad",
        "avatar": "https://randomuser.me/api/portraits/women/47.jpg"
    }


    return (

        <div className={styles.parent}>
            <h1>Parent Component</h1>
            <h3>Given data is passed to child component using props :</h3>
            <br />
            <p>"id": 1,
            "name": "Zara Khan",
            "email": "zara.khan47@example.com",
            "age": 25,
            "city": "Hyderabad",
            "avatar": "https://randomuser.me/api/portraits/women/47.jpg"</p><br />
            <Child
                avatar = {user.avatar}
                name = {user.name}
                email = {user.email}
                age = {user.age}
                city = {user.city} 
            />

        </div>
    )

}

export default Parent