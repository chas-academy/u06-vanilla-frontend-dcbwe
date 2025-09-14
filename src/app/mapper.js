export const UserMapper = {
    user: (u = {}) => ({
        id: u.id,
        email: u.email,
        active: u.active,
        verified: u.verified,
    }),
    profile: (p = {}) => ({
        firstname: p.profile.firstname,
        lastname: p.profile.lastname,
        fullName: p.profile.fullName,
        birthYear: p.profile.birthYear,
        gender: p.profile.gender,
        city: p.profile.city,
        country: p.profile.country,
        age: p.profile.age,
    }),
    details: (d = {}) => ({
        height: d.details.height,
        weight: d.details.weight,
        dailyRoutine: d.details.dailyRoutine,
        trainingLevel: d.details.trainingLevel,
    }),
    settings: (s = {}) => ({
        units: s.settings.units,
        language: s.settings.language,
        darkMode: s.settings.darkMode,
        "notifications.email": s.settings.notifications.email,
        "notifications.sms": s.settings.notifications.sms,
    }),
    health: (h = {}) => ({
        activityFactor: h.health.activityFactor,
        bmi: h.health.bmi,
        calories: h.health.calories,
    }),
};