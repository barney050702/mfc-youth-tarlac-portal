import os

file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Ranges to delete (1-indexed, inclusive)
ranges = [
    (1294, 1309), # modal-member-profile
    (1256, 1292), # modal-member-qr-id
    (833, 1168), # user-profile-backdrop
    (474, 578), # member-modal-backdrop
]

# Delete from bottom to top
for start, end in sorted(ranges, reverse=True):
    # 0-indexed indices
    s = start - 1
    e = end
    del lines[s:e]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Removed modals from index.html successfully.")
