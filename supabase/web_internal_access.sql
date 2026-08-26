-- Ejecutar una sola vez en el SQL Editor del proyecto actual de Supabase.
-- Esta tabla es independiente: no modifica inspecciones, firmas ni archivos.

create table if not exists public.web_internal_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Usuario institucional',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.web_internal_users enable row level security;

revoke all on table public.web_internal_users from anon;
revoke insert, update, delete on table public.web_internal_users from authenticated;
grant select on table public.web_internal_users to authenticated;

drop policy if exists "internal_user_can_verify_own_access" on public.web_internal_users;
create policy "internal_user_can_verify_own_access"
on public.web_internal_users
for select
to authenticated
using (auth.uid() = user_id and active = true);

-- Después de crear manualmente el usuario en Authentication > Users,
-- reemplaza el UUID de ejemplo por el identificador real del usuario:
-- insert into public.web_internal_users (user_id, display_name)
-- values ('00000000-0000-0000-0000-000000000000', 'Bomberos San Alberto');
