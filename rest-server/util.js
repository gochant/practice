var util = {

    message: function (success, data, msg, level) {
        return {
            success: success || true,
            data: data || null,
            msg: msg || "",
            level: level || 1
        };
    }
};

module.exports = util;
