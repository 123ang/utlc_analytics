
import './App.css';
import UserForm from './UserForm'; 
import UserList from './UserList';
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>UTLC Analytics System</h1>
            </header>
            <div>
                <h2>Create User</h2>
                <UserForm />
            </div>
            <div>
                <h2>User List</h2>
                <UserList />
            </div>
        </div>
    );
}

export default App;
