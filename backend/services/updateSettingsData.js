const dbConnect = require('./dbConnect');
const Joi = require('joi');

const updateSettingsData = async (email, data) => {
    try {
        const schema = Joi.object({
            darkMode: Joi.boolean(),
            country: Joi.string(),
            city: Joi.string(),
            phone: Joi.string().pattern(new RegExp(/^\+\d{2} \d{3} \d{3} \d{3}$/)).messages({
                'string.pattern.base': 'Numer telefonu powinien być w formacie: "+xx xxx xxx xxx"',
            }),
            dob: Joi.date().iso(),
        });

        const validationResult = schema.validate(data, { abortEarly: false });

        if (validationResult.error) {
            console.error("Validation error:", validationResult.error.details);
            const validationErrors = validationResult.error.details.map(error => error.message);
            return {
                success: false,
                errors: validationErrors,
            };
        }
        const db = await dbConnect();
        const collection = db.collection('Users');
        const query = { email: email}
        const result = await collection.updateOne(query, { $set: { settings: data } })
        return {
            success: true,
            message: 'Ustawienia zostały zaktualizowane pomyślnie.',
            response: result
        };

    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: 'Wystąpił błąd podczas aktualizacji ustawień.',
        };
    }
};

module.exports = updateSettingsData;
