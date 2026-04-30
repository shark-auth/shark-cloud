1. NavBar:

- remove (links and routes): Team, Roadmap.
- github stars: change them to display 1000 instad of 10k. notation only, ensure the system still fetches the git stars.

2. hero:

- Get th binary curl url should be sharkauth.com/get
- delgation canvas sliding component: replace it with a png palceholder, we will showcase UI there.

3. From zero to token exchange:

- change it to Simple ops or something, instead of having ssdk one side and getting binary one side and the steps cards shown down, it should be an only page wide CLI showing shark serve:
  shark ❯ shark serve  main    

  ▄▄▄▄▄  
   ██▀▀▀▀█▄ █▄  
   ▀██▄ ▄▀ ██ ▄ ▄▄  
   ▀██▄▄ ████▄ ▄▀▀█▄ ████▄ ██ ▄█▀  
   ▄ ▀██▄ ██ ██ ▄█▀██ ██ ████  
   ▀██████▀▄██ ██▄▀█▄██▄█▀ ▄██ ▀█▄

SharkAuth — Open Source Auth for Agents and Humans
Binary: 29 MB · Version: 0.1.0
Docs: https://sharkauth.com/docs
Repo: https://github.com/shark-auth/shark
13:17:42 INFO database schema up to date
13:17:42 INFO email: provider=dev â€” using in-db dev inbox for capture
13:17:42 INFO oauth: loaded existing ES256 signing key kid=uLHp-sa54BeWehkO

Dashboard http://localhost:8080/admin 4. general:

- replace any mention of Size: 40MB to Size: 29MB
- replace any mention of version 0.9.0 to version 0.1.0
- replace any reference to sharkauth.dev or something like that to the correct sharkauth.com

5. Watch a delegated request cross the wire:

- replace both cards with a single video component, should have a beautiful wrap in style of the page, ill add the video later. new title should be Watch delegation flows liveç

6. The console is embedded. The surface is small. The depth is real:

- this section should go, totally removed.

7. Building in the open.
   Bi-weekly write-ups on the future of agentic auth:

Actually wire this section to point out to the lastest blogs.
7.5 Pricing:

- take the pricing page and create a new pricing section in the home page, after the features section.

8. footer:

- remove the sha256 mention.
- contat route should do mailto raul@sharkauth.com
- remove the whole spec section from there.
- Sharkauth Labs and that tagline, rename to copyright 2026 SharkAuth - The Identity Provider for the Agentic Era.

9. Ensure all logic for waitlist, schedule demo, and the /telemetry route are ready for supabase.

- Telmetry route may not exist yet, if it doesn't wait and ask me after you finish everything else.
