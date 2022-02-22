import Validator from 'validator'
import isEmpty from 'is-empty'

const validateLoginInput = (data) =>
{
	const errors = {}
	console.log(data);
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''

	if(Validator.isEmpty(data.email))
	{
		errors.email = 'Email is required'
	}else if(!Validator.isEmail(data.email))
	{
		errors.email = 'Email field is invalid'
	}

	if(Validator.isEmpty(data.password))
	{
		errors.password = 'Password is requied'
	}

	const returnData = {
		errors,
		isValid : isEmpty(errors)
	}
	return returnData
	
}

export default validateLoginInput