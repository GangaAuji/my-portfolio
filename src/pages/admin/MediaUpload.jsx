import { assetUrl } from "../../api/client";

export function MediaUpload({ slot, label, url, onUpload, busy }) {
  return (
    <label className="admin-media-slot">
      <span className="admin-media-preview">
        {url ? <img src={assetUrl(url)} alt="" /> : <em>No file</em>}
      </span>
      <span>
        <strong>{label}</strong>
        <small>{slot}</small>
        <input
          type="file"
          accept=".png,.svg,.webp,.jpg,.jpeg,.gif,image/*"
          disabled={busy}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(slot, file);
            event.target.value = "";
          }}
        />
      </span>
    </label>
  );
}
