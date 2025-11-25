class ApplicationController < ActionController::API
  before_action :authorize_request
  def jwt_encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, jwt_secret)
  end
  def jwt_decode(token)
    body = JWT.decode(token, jwt_secret)[0]
    HashWithIndifferentAccess.new body
  rescue
    nil
  end
  private
  def jwt_secret
    Rails.application.secret_key_base
  end
  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    decoded = jwt_decode(header)
    if decoded
      @current_user = User.find_by(id: decoded[:user_id])
    else
      render json: { errors: ['Not Authorized'] }, status: :unauthorized
    end
  end
 end