import React, { useRef, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import 'semantic-ui-css/semantic.min.css';
import { Form, Checkbox, Label } from "semantic-ui-react";

import { connect } from "react-redux";
import { getAllCustomers,postCustomer } from "../../actions/customer";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);
export function UserProfile(props) {
  const classes = useStyles();
  let firstNameInput = useRef(null);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [firstName, setFirstName] = useState(true);
  let lastNameInput = useRef(null);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [lastName, setLastName] = useState(true);
  let phoneInput = useRef(null);
  const [phoneValid, setPhoneValid] = useState(true);
  const [phone, setPhone] = useState(true);
  let mailInput = useRef(null);
  const [mailValid, setMailValid] = useState(true);
  const [mail, setMail] = useState(true);
  let passwordInput = useRef(null);
  const [passwordValid, setPasswordValid] = useState(true);
  const [password, setPassword] = useState(true);
  let heightInput = useRef(null);
  const [heightValid, setHeightValid] = useState(true);
  const [height, setHeight] = useState(true);
  let weightInput = useRef(null);
  const [weightValid, setWeightValid] = useState(true);
  const [weight, setWeight] = useState(true);
  let ageInput = useRef(null);
  const [ageValid, setAgeValid] = useState(true);
  const [age, setAge] = useState(true);
  let chestInput = useRef(null);
  const [chestValid, setChestValid] = useState(true);
  const [chest, setChest] = useState(true);
  let pelvisInput = useRef(null);
  const [pelvisValid, setPelvisValid] = useState(true);
  const [pelvis, setPelvis] = useState(true);
  let waistInput = useRef(null);
  const [waistValid, setWaistValid] = useState(true);
  const [waist, setWaist] = useState(true);
  let cityInput = useRef(null);
  const [cityValid, setCityValid] = useState(true);
  const [city, setCity] = useState(true);
  let genderInput = useRef(null);
  const [genderValid, setGenderValid] = useState(true);//לעשות ולידציות
  const [gender, setGender] = useState(true);
  const joinDate = Date();
  const customerWeights = [{ date: joinDate, currentWeight: weight }];
  const [log, setLog] = useState(false);

  useEffect(() => {
    lastName.length < 2 ? setLastNameValid(false) : setLastNameValid(true);
    firstName.length < 2 ? setFirstNameValid(false) : setFirstNameValid(true);
    phone.length < 10 || phone.length > 10 ? setPhoneValid(false) : setPhoneValid(true);
    password.length < 6 ? setPasswordValid(false) : setPasswordValid(true);
    height < 100 || height > 200 ? setHeightValid(false) : setHeightValid(true);
    weight < 40 || weight > 250 ? setWeightValid(false) : setWeightValid(true);
    age < 10 || age > 120 ? setAgeValid(false) : setAgeValid(true);
    city.length < 3 ? setCityValid(false) : setCityValid(true);
    chest < 50 || chest > 200 ? setChestValid(false) : setChestValid(true);
    pelvis < 70 || pelvis > 350 ? setPelvisValid(false) : setPelvisValid(true);
    waist < 40 || age > 200 ? setWaistValid(false) : setWaistValid(true);
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(mail) || (!pattern.test(mail) && mailInput !== null)) { setMailValid(false); } else setMailValid(true);
  }, [firstName, firstNameValid, lastName, lastNameValid, phone, phoneValid, mail, mailValid, password, passwordValid, height, heightValid, weight, weightValid, age, ageValid, chest, chestValid, pelvis, pelvisValid, waist, waistValid, city, cityValid, gender, genderValid])

  const submit1 = () => {
    //לוקח את כל הלקוחות ומסנן רק את המיילים ששוים למייל שהלקוח הכניס
    console.log(props.getAllCustomers());
    
    let email = props.getAllCustomers.data.filter(c => c.mail == mail)
    if (!email) {
      if (firstNameValid && lastNameValid && phoneValid && mailValid && passwordValid && heightValid && weightValid && ageValid && pelvisValid && waistValid && chestValid && cityValid && genderValid) {
        let customer = {
          name: firstName,
          lastName: lastName,
          city: city,
          mail: mail,
          height: height,
          gender: gender,
          phone: phone,
          password: password,
          chest: chest,
          waist: waist,
          pelvis: pelvis,
          customerWeights: customerWeights,
          joinDate: joinDate
        };
        props.postCustomer(customer);
        console.log(customer);
        return (<Label basic color='red' pointing>נרשמת בהצלחה ברוך הבא</Label>);
      }
    } else {
      //אם יש לקוח בעל אותו מייל
      //צריך להציג לו הודעה שהמשתמש קיים במערכת
      console.log("שם המשתמש כבר קיים במערכת");
      return (<Label basic color='red' pointing>שם המשתמש כבר קיים במערכת</Label>);
    }

  }
  const submit2 = () => {
    let email = props.getAll.filter(c => c.mail == mail)
    if (email) {
      console.log("ברוך הבא", mail);
      return (<Label basic color='red' pointing>התחברת בהצלחה ברוך הבא</Label>);

    } else {
      console.log("שם המשתמש לא קיים במערכת אנא הרשם קודם")
      return (<Label basic color='red' pointing>שם המשתמש לא קיים במערכת אנא הרשם קודם</Label>);

    }

  }
  const signIn = () => {
    setLog(true);
    console.log(log);
  }
  const signUp = () => {
    setLog(false);
    console.log(log);

  }
  return (
    <div >
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <CardHeader color="primary">
                <Button color="green" className={classes.cardTitleWhite} onClick={() => { signIn() }}>התחברות</Button>
                <Button color="green" className={classes.cardTitleWhite} onClick={() => { signUp() }}>הרשמה</Button>
              </CardHeader>
            </CardHeader>
            {}
            {log && <div>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>התחברות</h4>
              </CardHeader>
              <CardBody>
                <h5 as='h7' color='teal' textAlign='right'>:פרטים אישיים</h5>

                <GridContainer>

                  <GridItem xs={12} sm={12} md={4}>

                    <input required ref={firstNameInput} onChange={() => {
                      let x = firstNameInput.current.value;
                      setFirstName(x);
                    }}
                      type='text' placeholder='שם משתמש-מייל' />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <input required type='text' placeholder=' סיסמא' ref={lastNameInput} onChange={() => {
                      let x = lastNameInput.current.value;
                      setLastName(x);
                    }} />
                  </GridItem>
                  <GridContainer>
                    {/* לעשות פונקציה של אישור היתחברות */}
                    <CardFooter>
                      <Button color="primary" onClick={() => { submit2() }}>אישור</Button>
                    </CardFooter>
                  </GridContainer>
                </GridContainer>
              </CardBody>
            </div>}
            {!log && <div>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>הרשם לאתרינו</h4>
                <p className={classes.cardCategoryWhite}>אנא הכנס את פרטייך שדות שמסומנים בכוכבים הינם שדות חובה</p>
              </CardHeader>
              <CardBody>
                <h5 as='h7' color='teal' textAlign='right'>:פרטים אישיים</h5>

                <GridContainer>

                  <GridItem xs={12} sm={12} md={4}>

                    <input required ref={firstNameInput} onChange={() => {
                      let x = firstNameInput.current.value;
                      setFirstName(x);
                    }}
                      type='text' placeholder='שם פרטי' />
                    {
                      !firstNameValid ?
                        <Label basic color='red' pointing>
                          בבקשה הכנס שם פרטי תקין
                            </Label>
                        :
                        null
                    }
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <input required type='text' placeholder='שם משפחה' ref={lastNameInput} onChange={() => {
                      let x = lastNameInput.current.value;
                      setLastName(x);
                    }} />
                    {
                      !lastNameValid ?
                        <Label basic color='red' pointing>
                          בבקשה הכנס שם משפחה תקין
              </Label>
                        : null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>

                    <input required type='text' placeholder='מספר פלאפון' ref={phoneInput}
                      onChange={() => {
                        let x = phoneInput.current.value;
                        setPhone(x);
                      }} />
                    {
                      !phoneValid ? <Label basic color='red' pointing>
                        בבקשה הכנס מספר פלאפון
                  </Label>
                        : null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>

                    <input required type='text' placeholder='עיר מגורים' ref={cityInput}
                      onChange={() => {
                        let x = cityInput.current.value;
                        setCity(x);
                      }} />
                    {!cityValid ? <Label basic color='red' pointing>
                      בבקשה הכנס עיר מגורים
                      </Label> : null}
                  </GridItem>
                </GridContainer>
                <h5 as='h7' color='teal' textAlign='right'>:נתונים</h5>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>

                    <input ref={heightInput} onChange={() => {
                      let x = heightInput.current.value;
                      setHeight(x);
                    }} type='number' placeholder='גובה' />
                    {!heightValid ? <Label basic color='red' pointing>
                      בבקשה הכנס גובה
                  </Label> : null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <input ref={weightInput} onChange={() => {
                      let x = weightInput.current.value;
                      setWeight(x);
                    }} type='number' placeholder='משקל' />
                    {!weightValid ? <Label basic color='red' pointing>
                      בבקשה הכנס משקל
                </Label> : null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <input ref={ageInput} onChange={() => {
                      let x = ageInput.current.value;
                      setAge(x);
                    }} type='number' placeholder='גיל' />
                    {!ageValid ? <Label basic color='red' pointing>
                      בבקשה הכנס גיל
                  </Label> : null}
                  </GridItem>
                </GridContainer>
                <h5 as='h7' color='teal' textAlign='right'>:מין</h5>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Form>
                      <Form.Field><input type="checkbox" defaultChecked="true" label="זכר" /><b>      זכר</b></Form.Field>
                      <Form.Field><input type="checkbox" label="נקבה" /><b>     נקבה</b></Form.Field>
                    </Form>
                  </GridItem>
                </GridContainer>
                <h5 as='h7' color='teal' textAlign='right'>:הקפים</h5>

                <GridContainer>
                  <br />
                  <GridItem xs={12} sm={12} md={4}>

                    <input ref={chestInput} onChange={() => {
                      let x = chestInput.current.value;
                      setChest(x);
                    }} type='number' placeholder='חזה' />
                    {!chestValid ? <Label basic color='red' pointing>
                      בבקשה הכנס מספר
                  </Label> : null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <input ref={pelvisInput} onChange={() => {
                      let x = pelvisInput.current.value;
                      setPelvis(x);
                    }} type='number' placeholder='אגן' />
                    {!pelvisValid ? <Label basic color='red' pointing>
                      בבקשה הכנס מספר
                </Label> : null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <input ref={waistInput} onChange={() => {
                      let x = waistInput.current.value;
                      setWaist(x);
                    }} type='number' placeholder='מותן' />
                    {!waistValid ? <Label basic color='red' pointing>
                      בבקשה הכנס מספר
                  </Label> : null}
                  </GridItem>
                </GridContainer>
                <h5 as='h7' color='teal' textAlign='right'>:אישור</h5>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>

                    <input required ref={mailInput} onChange={() => {
                      let x = mailInput.current.value;
                      setMail(x);
                    }} type='text' placeholder='דוא"ל' />
                    {!mailValid ? <Label basic color='red' pointing>
                      !הכנס מייל תקין
                 </Label> : null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <input required ref={passwordInput} onChange={() => {
                      let x = passwordInput.current.value;
                      setPassword(x);
                    }} type='password' placeholder='Password' />
                    {!passwordValid ? <Label basic color='red' pointing>
                      סיסמא חייבת להכיל 6 תווים לפחות
                  </Label> : null}
                  </GridItem>
                </GridContainer>

              </CardBody>
              {/* <div>
              New to us? <a href='#'>Sign Up</a>
            </div> */}
              <CardFooter>
                <Button color="primary" onClick={() => { submit1() }}>אישור</Button>

              </CardFooter>
            </div>}
          </Card>
        </GridItem>
      </GridContainer>
    </div >
  );
}
const mapStateToProps = (state) => {
  return { arr: state.customerArr };
}
export default connect(mapStateToProps, { postCustomer,getAllCustomers })(UserProfile);

