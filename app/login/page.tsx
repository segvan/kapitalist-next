import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="hero is-fullheight has-background-info-light">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-6 is-offset-3 is-desktop">
            <h3 className="title">Kapitalist</h3>
            <div className="box">
              <LoginForm />
            </div>
            <div className="has-text-right">
              <a className="has-text-grey" href="">
                Forgot Password
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
