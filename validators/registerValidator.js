import Validator from 'validator'
import isEmpty from 'is-empty'

const validateRegisterInput = (data) => {
	const errors = {}

	data.name = !isEmpty(data.name) ? data.name : ''
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	data.password2 = !isEmpty(data.password2) ? data.password2 : ''

	if(Validator.isEmpty(data.name))
	{
		errors.name = 'Name field is empty'
	}

	if(Validator.isEmpty(data.email))
	{
		errors.email = 'email field is empty'
	}else if(!Validator.isEmail(data.email))
	{
		errors.email = 'email is invalid'
	}

	if(Validator.isEmpty(data.password))
	{
		errors.password = 'password field is empty'
	}

	if(Validator.isEmpty(data.password2))
	{
		errors.password2 = 'Confirm password field is empty'
	}

	if(!Validator.isLength(data.password, {min: 6, max:30}))
	{
		errors.password = 'password length should be between 6 and 30 chars'
	}

	if(!Validator.equals(data.password, data.password2))
	{
		errors.password2 = "passwords don't match"
	}

	const isValid = isEmpty(errors)

	const returnData = {
		errors,
		isValid : isValid 
	}

	return returnData

}

export default validateRegisterInput