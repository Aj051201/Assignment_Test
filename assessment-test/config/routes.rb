Rails.application.routes.draw do
  # Auth Routes
  post 'signup', to: 'auth#signup'
  post 'login', to: 'auth#login'

  # Publications CRUD
  resources :publications, only: [:index, :create, :show, :update, :destroy]

  # Public publications route
  get 'publications/public', to: 'publications#public_index'
end
