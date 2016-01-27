require 'rails_helper'

feature 'Stats' do

  background do
    admin = create(:administrator)
    login_as(admin.user)
    visit root_path
  end

  context 'Summary' do

    scenario 'General' do
      create(:debate)
      2.times { create(:proposal) }
      3.times { create(:comment, commentable: Debate.first) }
      4.times { create(:visit) }

      visit admin_stats_path

      expect(page).to have_content "Debates 1"
      expect(page).to have_content "Proposals 2"
      expect(page).to have_content "Comments 3"
      expect(page).to have_content "Visits 4"
    end

    scenario 'Votes' do
      debate = create(:debate)
      create(:vote, votable: debate)

      proposal = create(:proposal)
      2.times { create(:vote, votable: proposal) }

      comment = create(:comment)
      3.times { create(:vote, votable: comment) }

      visit admin_stats_path

      expect(page).to have_content "Debate votes 1"
      expect(page).to have_content "Proposal votes 2"
      expect(page).to have_content "Comment votes 3"
      expect(page).to have_content "Votes 6"
    end

    scenario 'Users' do
      1.times { create(:user, :level_three) }
      2.times { create(:user, :level_two) }
      3.times { create(:user) }

      visit admin_stats_path

      expect(page).to have_content "Level-three users 1"
      expect(page).to have_content "Level-two users 2"
      expect(page).to have_content "Verified users 3"
      expect(page).to have_content "Unverified users 4"
      expect(page).to have_content "Users 7"
    end

  end

  xscenario 'Level 2 user' do
    expect(Census).to receive(:new)
                       .with(a_hash_including(document_type: "dni",
                                              document_number: "12345678Z"))
                       .and_return double(:valid? => true)

    visit account_path
    click_link 'Verify my account'
    verify_residence
    confirm_phone

    visit admin_stats_path

    expect(page).to have_content "Level 2 User (1)"
  end

end
