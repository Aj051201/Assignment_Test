class AuthController < ApplicationController
  skip_before_action :authorize_request, only: [:login, :signup]

  def signup
    user = User.new(signup_params)
    if user.save
      token = jwt_encode(user_id: user.id)
      render json: { token: token, user: { id: user.id, email: user.email, name: user.name } },
 status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = jwt_encode(user_id: user.id)
      render json: { token: token, user: { id: user.id, email: user.email, name: user.name } },
 status: :ok
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  private
  
  def signup_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end
 