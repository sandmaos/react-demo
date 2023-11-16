Server
Frame: express.js, cors, dotenv, app.use(routes), CRUD.
DB: Mongodb, Schemas, mongodb cloud Atlas cluster
Data handle: JWT(expire), md5(id), bcrypt(password)
Auth: auth middleware: check Bearer jwt, parse userinfo, then add/del cards


Client
Frame: React.js, Redux, MUI, Axios
Router: BrowserRouter, Router v6, Protected Route (check user auth, url path)
Redux: Action, Store, Reducer, PersistGate (store states to local when refresh)

Error page: error detail from useLocation.state.errorState, used in protected route.

Sign in: Mui form control, form data validate, emailjs for 6-bit verify code, 60s send count down, get jwt of 1 day expire from api, setup local and redux
Register: pwd double check logic, form error mark, reCAPTCHA for human test, show/hide pwd logic,

Forget pwd: check user and get token for 10 min expire, add token to link and send email.
Update pwd: use link in email, route protected to test token expire and user info, pwd re-confirm logic, bcrypt pwd.

Theme: react create context provider to pass theme down to components, change theme mode in header with 2 svgs and use pubSub to deliver change.

Home: useEffect of searchText, currPage, sortOption to call db, useMemo of currPage to dispatch page number, pre-process card list by page or search text, render card components. Handle text overflow to 3 lines WebkitLineClamp.

Pagination: mui pagination, pre calculate total page, curr page cards: slice(page-1, page)

Carousel: css module to define fade transition and opacity, translateValue to define the position of current card, 3s interval to change the curr card id by +1. move right: +1 mod cardNum, move left: +1+cardNum mod cardNum(avoid negative).

RegExp: used in protected route to determine path name and cards search logic.
