const UserService = require('../services/UserService')
const JwtSerVice = require('../services/jwtService')

const createUser = async (req, res) => {
    try {
      const { email, password, confirmpassword } = req.body;
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isCheckEmail = reg.test(email);
      if (!email || !password || !confirmpassword) {
        return res.status(400).json({
          status: "ERR",
          message: "The input is required",
        });
      } else if (!isCheckEmail) {
        return res.status(400).json({
          status: "ERR",
          message: "The input is email",
        });
      } else if (password !== confirmpassword) {
        return res.status(400).json({
          status: "ERR",
          message: "The password is equal confirmPassword",
        });
      }
      const response = await UserService.createUser(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

const loginUser = async (req, res) => {
    try {
        const { email , password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        if( !password || !email){
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if (!isCheckEmail) {
            return res.status(400).json({
              status: "ERR",
              message: "The input is email",
            });
        }
        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...newReponse } = response;
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict"
          // path: "/",
        });
        return res.status(200).json(newReponse)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(400).json({
              status: "ERR",
              message: "The userId is required",
            });
          }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(400).json({
              status: "ERR",
              message: "The userId is required",
            });
          }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(400).json({
              status: "ERR",
              message: "The userId is required",
            });
          }
        const response = await UserService.getDetailUser(userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(400).json({
              status: "ERR",
              message: "The token is required",
            });
          }
        const response = await JwtSerVice.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
    createUser, 
    loginUser,
    updateUser, 
    deleteUser,
    getAllUser,
    getDetailUser,
    refreshToken,
    logoutUser
}