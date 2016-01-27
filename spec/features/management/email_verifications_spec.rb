require 'rails_helper'

feature 'EmailVerifications' do

  scenario 'Verifying a level 1 user via email' do
    login_as_manager

    user = create(:user)

    visit management_document_verifications_path
    fill_in 'document_verification_document_number', with: '1234'
    click_button 'Check'

    fill_in 'email_verification_email', with: user.email
    find('*[type=submit]').click

    expect(page).to have_content("must click")

    user.reload

    login_as(user)

    sent_token = /.*email_verification_token=([0-9A-z]+)".*/.match(ActionMailer::Base.deliveries.last.body.to_s)[1]
    visit email_path(email_verification_token: sent_token)

    expect(page).to have_content "You are a verified user"

    expect(page).to_not have_link "Verify my account"
    expect(page).to have_content "Account verified"

    expect(user.reload.document_number).to eq('1234')
    expect(user).to be_level_three_verified
  end

end
