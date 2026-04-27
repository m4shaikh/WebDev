import styles from './Usingmap.module.css'

const UsingMap = () => {
    const list = [
        {
            "id": 1,
            "name": "Aarav Mehta",
            "email": "aarav.mehta@example.com",
            "age": 24,
            "city": "Ahmedabad"
        },
        {
            "id": 2,
            "name": "Riya Sharma",
            "email": "riya.sharma@example.com",
            "age": 22,
            "city": "Delhi"
        },
        {
            "id": 3,
            "name": "Kabir Singh",
            "email": "kabir.singh@example.com",
            "age": 26,
            "city": "Mumbai"
        },
        {
            "id": 4,
            "name": "Ananya Patel",
            "email": "ananya.patel@example.com",
            "age": 23,
            "city": "Surat"
        },
        {
            "id": 5,
            "name": "Vihaan Gupta",
            "email": "vihaan.gupta@example.com",
            "age": 25,
            "city": "Pune"
        },
        {
            "id": 6,
            "name": "Ishita Verma",
            "email": "ishita.verma@example.com",
            "age": 21,
            "city": "Jaipur"
        },
        {
            "id": 7,
            "name": "Arjun Nair",
            "email": "arjun.nair@example.com",
            "age": 27,
            "city": "Bangalore"
        },
        {
            "id": 8,
            "name": "Sneha Iyer",
            "email": "sneha.iyer@example.com",
            "age": 24,
            "city": "Chennai"
        },
        {
            "id": 9,
            "name": "Rahul Das",
            "email": "rahul.das@example.com",
            "age": 28,
            "city": "Kolkata"
        },
        {
            "id": 10,
            "name": "Priya Kulkarni",
            "email": "priya.kulkarni@example.com",
            "age": 23,
            "city": "Nagpur"
        }
    ]
    return (
        <div className={styles.page}>
            <h1 className={styles.pagetitle}> Using Map Method </h1>
            <ol className={styles.list}>
                {
                    list.map((user) => (

                        <li key={user.name}>
                            {user.name}
                            <ul className={styles.ul} key={user.id}>
                                <li key={user.email}>E-mail : {user.email} </li>
                                <li key={user.age}>Age : {user.age} </li>
                                <li key={user.city}>Location : {user.city} </li>
                            </ul>
                        </li>


                    ))
                }
            </ol>
        </div>
    )
}
export default UsingMap