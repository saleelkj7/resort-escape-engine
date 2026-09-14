-- Roles ---------------------------------------------------------------
create type public.app_role as enum ('admin', 'staff');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "own roles readable" on public.user_roles
  for select to authenticated using (user_id = auth.uid());
create policy "admins manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.profiles (
  id uuid primary key,
  email text,
  full_name text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile" on public.profiles
  for select to authenticated using (id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "update own profile" on public.profiles
  for update to authenticated using (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

-- Rooms ---------------------------------------------------------------
create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short text not null default '',
  description text[] not null default '{}',
  image_url text not null default '',
  gallery text[] not null default '{}',
  capacity text not null default 'On request',
  beds text not null default 'On request',
  size text not null default 'On request',
  amenities text[] not null default '{}',
  price_day integer,
  price_night integer,
  price_overnight integer,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
grant select on public.rooms to anon;
grant select, insert, update, delete on public.rooms to authenticated;
grant all on public.rooms to service_role;
alter table public.rooms enable row level security;
create policy "published rooms are public" on public.rooms for select to anon using (is_published);
create policy "signed in read rooms" on public.rooms for select to authenticated using (true);
create policy "admins write rooms" on public.rooms for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger rooms_touch before update on public.rooms for each row execute function public.touch_updated_at();

create table public.room_availability (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  date date not null,
  is_available boolean not null default false,
  note text,
  unique (room_id, date)
);
grant select on public.room_availability to anon;
grant select, insert, update, delete on public.room_availability to authenticated;
grant all on public.room_availability to service_role;
alter table public.room_availability enable row level security;
create policy "availability is public" on public.room_availability for select to anon using (true);
create policy "signed in read availability" on public.room_availability for select to authenticated using (true);
create policy "admins write availability" on public.room_availability for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Offers --------------------------------------------------------------
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  validity text not null default '',
  terms text not null default '',
  image_url text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  is_placeholder boolean not null default false,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
grant select on public.offers to anon;
grant select, insert, update, delete on public.offers to authenticated;
grant all on public.offers to service_role;
alter table public.offers enable row level security;
create policy "active offers are public" on public.offers for select to anon using (is_active);
create policy "signed in read offers" on public.offers for select to authenticated using (true);
create policy "admins write offers" on public.offers for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger offers_touch before update on public.offers for each row execute function public.touch_updated_at();

-- Gallery -------------------------------------------------------------
create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt text not null default '',
  category text not null default 'Property',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.gallery_images to anon;
grant select, insert, update, delete on public.gallery_images to authenticated;
grant all on public.gallery_images to service_role;
alter table public.gallery_images enable row level security;
create policy "published gallery is public" on public.gallery_images for select to anon using (is_published);
create policy "signed in read gallery" on public.gallery_images for select to authenticated using (true);
create policy "admins write gallery" on public.gallery_images for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Enquiries -----------------------------------------------------------
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  enquiry_type text not null default 'General Enquiry',
  check_in date,
  check_out date,
  guests integer,
  message text not null default '',
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant insert on public.enquiries to anon;
grant select, insert, update, delete on public.enquiries to authenticated;
grant all on public.enquiries to service_role;
alter table public.enquiries enable row level security;
create policy "anyone can send an enquiry" on public.enquiries for insert to anon with check (true);
create policy "authenticated can send an enquiry" on public.enquiries for insert to authenticated with check (true);
create policy "admins read enquiries" on public.enquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admins update enquiries" on public.enquiries for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "admins delete enquiries" on public.enquiries for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Bookings ------------------------------------------------------------
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  phone text not null,
  email text,
  room_id uuid references public.rooms(id) on delete set null,
  room_slug text,
  check_in date not null,
  check_out date not null,
  adults integer not null default 2,
  children integer not null default 0,
  rooms_count integer not null default 1,
  notes text not null default '',
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant insert on public.bookings to anon;
grant select, insert, update, delete on public.bookings to authenticated;
grant all on public.bookings to service_role;
alter table public.bookings enable row level security;
create policy "anyone can request a booking" on public.bookings for insert to anon with check (true);
create policy "authenticated can request a booking" on public.bookings for insert to authenticated with check (true);
create policy "admins read bookings" on public.bookings for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admins update bookings" on public.bookings for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "admins delete bookings" on public.bookings for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Seed content --------------------------------------------------------
insert into public.rooms (slug, name, short, description, image_url, gallery, amenities, price_day, price_night, price_overnight, sort_order) values
('deluxe-room','Deluxe Room','Thoughtfully designed spaces for a comfortable and relaxing stay.',
 array['Our Deluxe Rooms are the easiest way to settle into the pace of the retreat — calm interiors, soft daylight and a view of the greenery that surrounds the property.','Everything is kept simple and considered: a well-made bed, a quiet corner to sit with a coffee, and the pool and gardens a short walk away.'],
 '/images/room-deluxe.jpg', array['/images/room-deluxe.jpg','/images/nature.jpg','/images/pool.jpg'],
 array['Air conditioning','Attached bathroom','Daily housekeeping','Wi-Fi','Room service','Swimming pool access'], null, null, null, 10),
('super-deluxe-room','Super Deluxe Room','More space, warmer materials and a generous place to unwind.',
 array['A step up in space and comfort, the Super Deluxe Room pairs earthy tones with a roomier layout — ideal for couples and small families who like room to spread out.','Wake up slowly, open the curtains to palms and quiet, and let the day take its own shape.'],
 '/images/room-super-deluxe.jpg', array['/images/room-super-deluxe.jpg','/images/pool.jpg','/images/nature.jpg'],
 array['Air conditioning','Attached bathroom','Daily housekeeping','Wi-Fi','Room service','Swimming pool access'], 2240, 2800, 3360, 20),
('executive-room','Executive Room','A refined room with a sitting area for longer, slower stays.',
 array['The Executive Room adds a comfortable sitting area to the formula — a good choice if you are staying a little longer, or travelling for work and want somewhere composed to return to.','Deep tones, warm wood and soft lighting make evenings here feel unhurried.'],
 '/images/room-executive.jpg', array['/images/room-executive.jpg','/images/dining.jpg','/images/nature.jpg'],
 array['Air conditioning','Attached bathroom','Daily housekeeping','Wi-Fi','Room service','Swimming pool access','Seating area'], 2240, 2800, 3360, 30),
('suite-room','Suite Room','Our most spacious room category, with a separate lounge.',
 array['The Suite is the most generous of our rooms — a separate lounge, high ceilings and space for family to gather before dinner.','It works equally well for a celebration weekend or a quiet escape where space itself is the luxury.'],
 '/images/room-suite.jpg', array['/images/room-suite.jpg','/images/pool.jpg','/images/dining.jpg'],
 array['Air conditioning','Attached bathroom','Daily housekeeping','Wi-Fi','Room service','Swimming pool access','Separate lounge'], 2240, 2800, 3360, 40),
('wooden-cottage','Wooden Cottage','A timber cottage tucked into the greenery, with its own porch.',
 array['Our Wooden Cottages sit closest to the trees. Timber walls, a private porch and the sound of leaves make this the most characterful way to stay at Rehcruz.','Morning coffee on the steps is, quite simply, the point.'],
 '/images/room-cottage.jpg', array['/images/room-cottage.jpg','/images/nature.jpg','/images/pool.jpg'],
 array['Air conditioning','Attached bathroom','Daily housekeeping','Wi-Fi','Room service','Swimming pool access','Private porch'], 2240, 2800, 3360, 50),
('dormitory-room','Dormitory Room','Clean, comfortable shared accommodation for larger groups.',
 array['Built for groups — school trips, corporate offsites, friends travelling together — the Dormitory keeps everyone under one roof without compromising on cleanliness or comfort.','Pair it with our day-picnic and dining packages for a complete group stay.'],
 '/images/room-dormitory.jpg', array['/images/room-dormitory.jpg','/images/pool.jpg','/images/dining.jpg'],
 array['Shared bathrooms','Daily housekeeping','Wi-Fi','Swimming pool access','Group dining packages'], null, null, null, 60),
('villa','Private Villa','An exclusive villa for families and private celebrations.',
 array['Take the whole villa. Private, self-contained and set apart from the main resort, it suits families, small celebrations and groups who would rather have the place to themselves.','Speak with our team to plan dining, décor and arrival timings around your occasion.'],
 '/images/villa.jpg', array['/images/villa.jpg','/images/pool.jpg','/images/dining.jpg'],
 array['Private outdoor area','Air conditioning','Housekeeping','Wi-Fi','In-villa dining on request'], null, null, null, 70);

update public.rooms set beds = 'Multiple single beds' where slug = 'dormitory-room';

insert into public.offers (title, body, validity, terms, image_url, sort_order, is_placeholder) values
('Weekend Escape','A two-night weekend stay with breakfast, planned around the pool and the gardens.','Validity to be confirmed by the property','Subject to availability. Tariff quoted at the time of enquiry.','/images/pool.jpg',10,true),
('Family Getaway','Room or cottage accommodation with a family food package and full-day pool access.','Validity to be confirmed by the property','Subject to availability. Tariff quoted at the time of enquiry.','/images/room-deluxe.jpg',20,true),
('Romantic Retreat','A cottage or suite stay for two with a private dinner arranged in the garden.','Validity to be confirmed by the property','Subject to availability. Tariff quoted at the time of enquiry.','/images/room-suite.jpg',30,true),
('Group & Long Stay','Dormitory or multi-room bookings with dining, for groups staying two nights or more.','Validity to be confirmed by the property','Subject to availability. Tariff quoted at the time of enquiry.','/images/room-dormitory.jpg',40,true);

insert into public.gallery_images (image_url, alt, category, sort_order) values
('/images/pool.jpg','Swimming pool surrounded by palms at Rehcruz D Retreat','Pool',10),
('/images/nature.jpg','Garden path lined with palm trees in morning light','Nature',20),
('/images/dining.jpg','Open-air dining tables set under string lights','Dining',30),
('/images/weddings.jpg','Wedding mandap set up on the resort lawn at dusk','Weddings',40),
('/images/villa.jpg','Private villa exterior with terrace and plunge pool','Property',50),
('/images/room-cottage.jpg','Wooden cottage with a porch surrounded by greenery','Rooms',60),
('/images/room-suite.jpg','Suite lounge with high timber ceiling and ivory sofa','Rooms',70),
('/images/room-deluxe.jpg','Deluxe room with white linen bed and garden view','Rooms',80),
('/images/room-executive.jpg','Executive room with seating area and warm lighting','Rooms',90),
('/images/room-super-deluxe.jpg','Super deluxe room with balcony and palm view','Rooms',100),
('/images/room-dormitory.jpg','Dormitory room with neatly made single beds','Rooms',110);