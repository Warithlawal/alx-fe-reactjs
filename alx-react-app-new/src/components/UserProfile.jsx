const UserProfile = (props) => {
    return (
        <div style={{ border: '1px solid gray', padding: '20px', margin: '20px', borderRadius: '10px' }}>
            <h2 style={{ color: 'blue', fontSize: '24px' }}>{props.name}</h2>
            <p>Age: <span style={{ fontWeight: 'bold', color: 'darkgreen' }}>{props.age}</span></p>
            <p style={{ fontStyle: 'italic' }}>{props.bio}</p>
        </div>
    );
};

export default UserProfile;
