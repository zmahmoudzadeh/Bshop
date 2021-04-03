import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';

function CustomNavbar(props) {
  const [profile, setProfile] = useState(null);
  const [dropVis, setDropVis] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setProfile(null);
      return;
    }
    //set profile if exists
    fetch("http://127.0.0.1:8000/users/profile", {
      method: 'GET',
      headers: {
        "Authorization": "Token " + localStorage.getItem('token')
      }
    }).then(
      res => {
        if (res.status === 200) {
          return res.json()
        }
        return null;
      }
    ).then(
      res => {
        if(res === null)
          return;
        if (!(res?.urls?.length > 0)) {
          res.urls = [{ uploaded_file: "./../profile.png" }];
          res.files = [-1];
        }
        if(!localStorage.getItem("role"))
          localStorage.setItem("role",res.role);
        
        if(!localStorage.getItem("username"))
          localStorage.setItem("username",res.user_name);

        setProfile(res)
      }
    )
      .catch(e => console.log(e));
  }, [props.triggerNavbarUpdate])

  const logout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    window.location.replace("/");
  }

  return (
    <Navbar fixed="top" className='custom-nav'>
      <Navbar.Brand ><a href="/">Bshop</a><div className="btn" data-testid="nav-theme-toggle" onClick={() => props.setMode(props.theme[0] === 'l' ? 'd' : 'l')}> {props.theme[0] === 'l' ? '☀' : '🌙'}</div></Navbar.Brand>
      <Nav className="mr-auto">
        {!profile ?
          <Nav.Link href="/login" data-testid="no-profile" className="no-profile">ورود / ثبتنام</Nav.Link>
          :
          <div className="nav-profile">
            <img data-testid="nav-prof-img" className="image btn" src={profile && profile.urls && profile.urls.length > 0 ? profile.urls[0].uploaded_file : "./../profile.png"} alt="profile" onClick={() => setDropVis(!dropVis)} />
            <div className="dropdown" hidden={!dropVis} data-testid="nav-dropdown" >
              <CloseIcon className="drop-exit" onClick={() => setDropVis(!dropVis)} />
              <div className="dropprofile drop-item" >
                <div className="img-parent">
                  <img data-testid="dropdown-img" src={profile && profile.urls && profile.urls.length > 0 ? profile.urls[0].uploaded_file : "./../profile.png"} alt="profile" />
                </div>
                <div className="prof-info">
                  <p className="name" data-testid="dropdown-fullname" >{profile?.FirstName || profile.LastName ? (profile?.FirstName + " " + profile?.LastName) : "بدون نام"}</p>
                  <p className="username" data-testid="dropdown-username" >{profile?.user_name}</p>
                </div>
                <a href="/profile" className="drop-continue">
                  مشاهده پروفایل
            </a>
              </div>
              <div className="drop-break"></div>
              <div className="drop-item drop-a a" href="#" >
                کیف پول
          </div>
              <div className="drop-item drop-a a" href="#" >
                گزارش خرید
          </div>
              <div className="drop-item drop-a a" onClick={() => logout()} >
                خروج
          </div>
            </div>
          </div>
        }
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Form inline>
          <FormControl type="text" placeholder="جستجو..." className=" mr-sm-2" style={{ direction: "rtl" }} />
          <div className="btn" type="submit" >Submit</div>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar;