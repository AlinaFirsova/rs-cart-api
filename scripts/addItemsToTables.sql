insert into
  users (id, name, password)
values
  (
    '7b7b1b7d-c2e8-411f-bc24-7515600f2681',
    'Alina',
    'password'
  ),
  (
    '061dd6f7-ab08-42aa-8d35-079fe7574a15',
    'Julia',
    'password'
  ),
  (
    '0e4bdc1f-f484-404f-a7d7-6b2c841c30ba',
    'Sergey',
    'password'
  ),
  (
    'ea171d90-e3cc-412f-9027-3e834ad9f977',
    'Alexey',
    'password'
  ),
  (
    '32257b86-aaf8-4e05-a494-472c996b1ac2',
    'Anna',
    'password'
  )
insert into
  carts (id, user_id, created_at, updated_at, status)
values
  (
    'e77af4d5-77bc-458c-9239-91e45573bb26',
    '7b7b1b7d-c2e8-411f-bc24-7515600f2681',
    '2023-02-22',
    '2023-02-24',
    'OPEN'
  ),
  (
    'b0dee102-a126-4124-b751-7a929feb54d9',
    '061dd6f7-ab08-42aa-8d35-079fe7574a15',
    '2023-03-20',
    '2023-03-20',
    'OPEN'
  ),
  (
    '3e3f427e-a0d5-44da-adc8-a4b3c68cb20f',
    '7b7b1b7d-c2e8-411f-bc24-7515600f2681',
    '2023-04-01',
    '2023-04-05',
    'OPEN'
  ),
  (
    '3be771ed-9c4b-4e85-a142-55607338cfb2',
    '061dd6f7-ab08-42aa-8d35-079fe7574a15',
    '2023-03-09',
    '2023-03-09',
    'ORDERED'
  )
insert into
  cart_items (cart_id, product_id, count)
values
  (
    'e77af4d5-77bc-458c-9239-91e45573bb26',
    '9e0f0641-c75a-4f04-a64b-ea073ec086ec',
    '2'
  ),
  (
    'b0dee102-a126-4124-b751-7a929feb54d9',
    '054ab75e-8782-4b61-a844-c5e3c8d7b5fd',
    '1'
  ),
  (
    '3e3f427e-a0d5-44da-adc8-a4b3c68cb20f',
    '054ab75e-8782-4b61-a844-c5e3c8d7b5fd',
    '5'
  )
insert into
  orders (id, user_id, cart_id, status, total)
values
  (
    '550da4af-57f2-4978-bbab-f3e2fc41c694',
    '061dd6f7-ab08-42aa-8d35-079fe7574a15',
    '3be771ed-9c4b-4e85-a142-55607338cfb2',
    'IN_PROGRESS',
    2500
  )