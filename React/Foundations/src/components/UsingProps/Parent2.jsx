import Child2 from "./Child2"
import styles from './UsingProps.module.css'

const Parent2 = () => {
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
            <h3>Given data is passed to child component using children:</h3>
            <br />
            <p>"id": 1,
            "name": "Zara Khan",
            "email": "zara.khan47@example.com",
            "age": 25,
            "city": "Hyderabad",
            "avatar": "https://randomuser.me/api/portraits/women/47.jpg"</p><br />
            <Child2>
                <div><img className={styles.avatar} src={user.avatar} alt={user.name} /></div>
                <div>Name :{user.name}</div>
                <div>Email :{user.email}</div>
                <div>Age :{user.age}</div>
                <div>City :{user.city}</div>

            </Child2>

        </div>
    )

}

export default Parent2