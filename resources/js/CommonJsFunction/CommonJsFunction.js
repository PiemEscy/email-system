export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const toCamelCase = (str) => {
    return str
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getValue = (data, key, defaultVal = '') => {
    return data && data[key] !== undefined ? data[key] : defaultVal;
};

export const validateData = (data, rules) => {
    const errors = {};

    for (const field in rules) {
        const fieldRules = rules[field]; // e.g. ['required', 'string', 'max:50']
        const value = data[field];

        fieldRules.forEach(rule => {
            if (rule === "required") {
                if (value === undefined || value === null || value === "" ||
                    (Array.isArray(value) && value.length === 0)) {
                    errors[field] = `${toCamelCase(field)} is required`;
                }
            }

            if (rule === "string" && value && typeof value !== "string") {
                errors[field] = `${toCamelCase(field)} must be a string`;
            }

            if (rule.startsWith("max:")) {
                const limit = parseInt(rule.split(":")[1]);
                if (value && value.length > limit) {
                    errors[field] = `${toCamelCase(field)} may not be greater than ${limit} characters`;
                }
            }

            if (rule === "email" && value) {
                if (!validateEmail(value)) {
                    errors[field] = `${toCamelCase(field)} must be a valid email`;
                }
            }

            if (rule === "array" && value) {

                if(field === 'cc'){
                if (typeof value === "string") {
                    var newValue = value.split(/[,\s]+/).map(s => s.trim()).filter(Boolean);
                }else{
                    var newValue = value;
                }

                }
                if (!Array.isArray(newValue)) {
                    errors[field] = `${toCamelCase(field)} must be an array`;
                }
            }
        });
        
        if (field.includes("cc.*")) {
            const fieldName = field.replace(".*", "");
            if (Array.isArray(data[fieldName])) {
                const invalidEmails = [];
                const duplicates = [];
                const seen = new Set();

                data[fieldName].forEach((item, index) => {
                    // Check for invalid email
                    fieldRules.forEach(rule => {
                        if (rule === "email" && !validateEmail(item)) {
                            invalidEmails.push(item);
                        }
                    });

                    // Check for duplicates
                    if (seen.has(item)) {
                        duplicates.push(item);
                    } else {
                        seen.add(item);
                    }
                });

                // Helper to format with "and"
                const formatList = (arr) => {
                    if (arr.length === 1) return arr[0];
                    if (arr.length === 2) return arr.join(" and ");
                    return arr.slice(0, -1).join(", ") + " and " + arr.slice(-1);
                };

                const errorParts = [];

                if (invalidEmails.length > 0) {
                    errorParts.push(`${formatList(invalidEmails)} must be a valid email`);
                }

                if (duplicates.length > 0) {
                    errorParts.push(`${formatList(duplicates)} cannot be duplicated`);
                }

                if (errorParts.length > 0) {
                    errors[fieldName] = errorParts.join(". ");
                }
            }
        }


    }

    return errors;
};