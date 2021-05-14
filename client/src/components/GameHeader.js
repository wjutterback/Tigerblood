import { Link } from 'react-router-dom';

export const GameHeader = () => {
  return (
    <div className='row'>
      <Link to='/' style={{ margin: '25px auto 100px auto' }}>
        <img src='/preview/tigerbloodlogo.png' alt='logo' id='logo' style={{ height: "300px" }}/>
      </Link>
    </div>
  );
};