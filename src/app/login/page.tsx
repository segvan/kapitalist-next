import LoginForm from "@/src/components/LoginForm";

function Login() {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container columns has-text-centered">
          <div className="column is-6 is-offset-3 is-desktop">
            <h3 className="title">Kapitalist</h3>
            <div className="box">
              <LoginForm/>
            </div>
            <div className="has-text-right">
              <a className="has-text-grey" href="">
                Forgot Password
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
