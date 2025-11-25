class PublicationsController < ApplicationController
  before_action :set_publication, only: [:update, :destroy]
  # GET /api/publications
  def index
    pubs = @current_user.publications.order(created_at: :desc)
    render json: pubs, status: :ok
  end
  # GET /api/publications/public
  skip_before_action :authorize_request, only: [:public_index]
  def public_index
    pubs = Publication.where(status: :published).order(created_at: :desc)
    render json: pubs, status: :ok
  end
  # POST /api/publications
  def create
    pub = @current_user.publications.new(publication_params)
    if pub.save
      render json: pub, status: :created
    else
      render json: { errors: pub.errors.full_messages }, status: :unprocessable_entity
    end
  end
  def update
    if @publication.user_id != @current_user.id
      return render json: { errors: ['Not Authorized'] }, status: :forbidden
    end
    if @publication.update(publication_params)
      render json: @publication, status: :ok
    else
      render json: { errors: @publication.errors.full_messages }, status: :unprocessable_entity
    end
  end
  def destroy
    if @publication.user_id != @current_user.id
      return render json: { errors: ['Not Authorized'] }, status: :forbidden
    end
    @publication.destroy
    head :no_content
  end
  private
  def set_publication
    @publication = Publication.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ['Publication not found'] }, status: :not_found
  end
  def publication_params
    params.require(:publication).permit(:title, :content, :status)
  end
 end