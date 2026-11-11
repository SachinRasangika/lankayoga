-- Placeholder rows shipped with the first migrations. Admin-authored rows stay.

delete from public.classes
where id in ('pranayama', 'alignment', 'restorative', 'nidra', 'private');

delete from public.treatments
where id in ('abhyanga', 'shirodhara', 'pizhichil', 'udvartana', 'nasya', 'takradhara');

delete from public.packages
where id in ('immersion-mar', 'panchakarma-14-feb', 'panchakarma-21-nov', 'ytt-200-oct');
