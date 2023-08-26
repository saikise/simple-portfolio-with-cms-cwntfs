BEGIN;

INSERT INTO series (code, title, description, icon) VALUES  
('web-projects', 'Web Projects', 'My web projects mostly created with React.', 'web'),
('mobile-projects', 'Mobile Projects', 'My mobile projects mostly created with React Native.', 'mobile'),
('desktop-projects', 'Desktop Projects', 'My desktop projects mostly created with Electron.', 'desktop');

INSERT INTO platforms (title, icon) VALUES 
('Live Demo', 'demo'),
('YouTube', 'youtube');

INSERT INTO projects (pinned, title, description, image) VALUES 
(false, 'Simple Portfolio', 'Practice quick web dev with Next.js 13 (React) App Router following a single article. No backend.', '/images/project-image.png'),
(false, 'Ecommerce Store', 'A full-stack ecommerce store built with React, Node.js, and MongoDB. Features include user authentication, product search and filtering, and shopping cart functionality.', '/images/project-image.png'),
(false, 'Social Media App', 'A social media app built with React, Node.js, and MongoDB. Features include user authentication, post creation and commenting, and user profiles.', '/images/project-image.png'),
(false, 'Recipe App', 'A recipe app built with React and the Edamam API. Features include recipe search and filtering, ingredient list, and nutrition information.', '/images/project-image.png'),
(false, 'Movie App', 'A movie app built with React and the TMDB API. Features include movie search and filtering, movie details, and user ratings.', '/images/project-image.png'),
(false, 'Music App', 'A music app built with React and the Spotify API. Features include music search and filtering, album details, and user playlists.', '/images/project-image.png'),
(false, 'News App', 'A news app built with React and the NewsAPI. Features include news search and filtering, article details, and user bookmarks.', '/images/project-image.png'),
(false, 'Job Board', 'A job board app built with React and the GitHub Jobs API. Features include job search and filtering, job details, and user job applications.', '/images/project-image.png'),
(false, 'Chat App', 'A chat app built with React and Firebase. Features include user authentication, real-time messaging, and user profiles.', '/images/project-image.png'),
(false, 'Blog App', 'A blog app built with React and the WordPress API. Features include blog search and filtering, post details, and user comments.', '/images/project-image.png'),
(false, 'Weather App', 'A weather app built with React Native and the OpenWeatherMap API. Features include current weather conditions, hourly and daily forecasts, and user location detection.', '/images/project-image.png'),
(false, 'Food Delivery App', 'A food delivery app built with React Native and the Uber Eats API. Features include restaurant search and filtering, menu items, and user orders.', '/images/project-image.png'),
(false, 'Fitness App', 'A fitness app built with React Native and the Fitbit API. Features include workout tracking, step counting, and user goals.', '/images/project-image.png'),
(false, 'Travel App', 'A travel app built with React Native and the TripAdvisor API. Features include destination search and filtering, hotel details, and user reviews.', '/images/project-image.png'),
(false, 'Language Learning App', 'A language learning app built with React Native and the Duolingo API. Features include language selection, lesson plans, and user progress tracking.', '/images/project-image.png'),
(false, 'Note-taking app', 'A note-taking app built with Electron and the Duolingo API. Features include language selection, lesson plans, and user progress tracking.', '/images/project-image.png'),
(false, 'Music Player', 'A music player app built with Electron.', '/images/project-image.png'),
(false, 'Study Spatial Repetition App', 'A Study Spatial Repetition App built with Electron. Features include language selection, lesson plans, and user progress tracking.', '/images/project-image.png'),
(false, 'Anki Clone', 'An Anki Clone built with Electron. Features include language selection, lesson plans, and user progress tracking.', '/images/project-image.png');

-- Attach series to projects
INSERT INTO projects_series (project_id, series_id) VALUES 
((SELECT id FROM projects WHERE title = 'Note-taking app'), (SELECT id FROM series WHERE code = 'desktop-projects')),
((SELECT id FROM projects WHERE title = 'Music Player'), (SELECT id FROM series WHERE code = 'desktop-projects')),
((SELECT id FROM projects WHERE title = 'Study Spatial Repetition App'), (SELECT id FROM series WHERE code = 'desktop-projects')),
((SELECT id FROM projects WHERE title = 'Anki Clone'), (SELECT id FROM series WHERE code = 'desktop-projects'));

INSERT INTO projects_series (project_id, series_id) VALUES 
((SELECT id FROM projects WHERE title = 'Weather App'), (SELECT id FROM series WHERE code = 'mobile-projects')),
((SELECT id FROM projects WHERE title = 'Food Delivery App'), (SELECT id FROM series WHERE code = 'mobile-projects')),
((SELECT id FROM projects WHERE title = 'Fitness App'), (SELECT id FROM series WHERE code = 'mobile-projects')),
((SELECT id FROM projects WHERE title = 'Travel App'), (SELECT id FROM series WHERE code = 'mobile-projects')),
((SELECT id FROM projects WHERE title = 'Language Learning App'), (SELECT id FROM series WHERE code = 'mobile-projects'));

INSERT INTO projects_series (project_id, series_id) VALUES 
((SELECT id FROM projects WHERE title = 'Simple Portfolio'), (SELECT id FROM series WHERE code = 'web-projects')),
((SELECT id FROM projects WHERE title = 'Ecommerce Store'), (SELECT id FROM series WHERE code = 'web-projects')),
((SELECT id FROM projects WHERE title = 'Social Media App'), (SELECT id FROM series WHERE code = 'web-projects')),
((SELECT id FROM projects WHERE title = 'Recipe App'), (SELECT id FROM series WHERE code = 'web-projects')),
((SELECT id FROM projects WHERE title = 'Movie App'), (SELECT id FROM series WHERE code = 'web-projects')),
((SELECT id FROM projects WHERE title = 'Music App'), (SELECT id FROM series WHERE code = 'web-projects')),
((SELECT id FROM projects WHERE title = 'News App'), (SELECT id FROM series WHERE code = 'web-projects')),
((SELECT id FROM projects WHERE title = 'Job Board'), (SELECT id FROM series WHERE code = 'web-projects')),
((SELECT id FROM projects WHERE title = 'Chat App'), (SELECT id FROM series WHERE code = 'web-projects')),
((SELECT id FROM projects WHERE title = 'Blog App'), (SELECT id FROM series WHERE code = 'web-projects'));

-- Attach platforms to projects
INSERT INTO projects_platforms (project_id, platform_id, url) VALUES 
((SELECT id FROM projects WHERE title = 'Simple Portfolio'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Ecommerce Store'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Social Media App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Recipe App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Movie App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Music App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'News App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Job Board'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Chat App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Blog App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Weather App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Food Delivery App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Fitness App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Travel App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Language Learning App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Note-taking app'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Music Player'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Study Spatial Repetition App'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo'),
((SELECT id FROM projects WHERE title = 'Anki Clone'), (SELECT id FROM platforms WHERE title = 'Live Demo'), '/demo');

COMMIT;