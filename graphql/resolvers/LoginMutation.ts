import {
  Args,

  MyContext,

  Player,
} from "../../types/types";
import AppError from "../../utility/AppError";
import {
  generateHashedPassword,
  comparePasswords,
  signJWT,
  hasAccess,
} from "../../utility/Security";
import PlayerModel from "../../mongoose/models/playerModel";

export default {
  register: async (_parent: never, { input }: Args) => {
    if ("confirmPassword" in input) {
      if (input.password != input.confirmPassword) {
        throw new AppError("Passwords doesn't match!", 401);
      }

      let newPlayer = new PlayerModel({
        email: input.email,
        name: input.name,
        gamerTag: input.gamerTag,
        phone: input.phone,
      });
      newPlayer.hash_password = generateHashedPassword(input.password);
      newPlayer = await PlayerModel.create(newPlayer);
      newPlayer.hash_password = "";
      return newPlayer;
    } else {
      return null;
    }
  },

  sign_in: async (_parent: never, { input }: Args) => {
    if ("email" in input && "password" in input) {
      let player = await PlayerModel.findOne({ email: input.email });

      if (
        !player ||
        !comparePasswords(
          input.password,
          player.hash_password ? player.hash_password : ""
        )
      ) {
        throw new AppError(
          "Authentication failed. Invalid user or password.",
          401
        );
      } else {
        player.hash_password = ""
        let adminAccess = player.role == "Admin" ? true : false

        return {
          token: signJWT({
            _id: player.get("id"),
            name: player.get("name"),
            email: player.get("email"),
            role: player.get("role"),
          } as Player),
          player: player,
          adminAccess
        };
      }
    }
  },
  admin_access: async (_parent: never, { token }: Args) => {
    return hasAccess("Admin", token)
  }

  /* updateUser: async (
    _parent: never,
    { id, input }: Args,
    { user }: MyContext
  ) => {
    if (user != null && id == user._id) {
      if ("fullName" in input) {
        let updatedUser = await UserModel.findByIdAndUpdate(id, input, {
          new: true,
          runValidators: true,
        });
        return updatedUser;
      }
    } else {
      throw new AppError("Authentication failed. Invalid user", 401);
    }
  }, */
};
