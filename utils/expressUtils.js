const checkReservedParams = (routeHandler, ...reserved) => {
    return (req, res, next) => {
        for (const reservedKey of reserved) {
            if (req.body[reservedKey]) {
                return res.status(400).json({
                    error: `Cannot specify ${reservedKey} as part of request body`
                });
            }
        }

        routeHandler(req, res, next);
    }
};

exports.checkReservedParams = checkReservedParams;

const catchAsyncErrors = (routeHandler) => {
    return async (req, res, next) => {
        try {
            await routeHandler(req, res, next);
        } catch (err) {
            next(err);
        }
    }
};

exports.catchAsyncErrors = catchAsyncErrors;