package tennis_reservation_backend.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "courts")
public class Court {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;

    // ★ DBのカラム名 is_indoor を明示マッピング。初期値を false に固定
    @Column(name = "is_indoor", nullable = false)
    @JsonProperty("isIndoor")
    @JsonAlias({"indoor", "is_indoor"})
    private Boolean isIndoor = false;

    private String date;

    @Column(name = "time_slot")
    private String timeSlot;

    @Column(name = "price_per_hour")
    private Integer pricePerHour;

    private String description;
    private String status = "available";

    @Column(name = "is_deleted")
    private Boolean isDeleted = false;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "updated_at")
    private String updatedAt;

    @PrePersist
    public void onCreate() {
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.createdAt = now;
        this.updatedAt = now;

        // null ガード（絶対に null で保存させない）
        if (this.isIndoor == null) {
            this.isIndoor = false;
        }
        if (this.isDeleted == null) {
            this.isDeleted = false;
        }
        if (this.status == null || this.status.trim().isEmpty()) {
            this.status = "available";
        }
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        if (this.isIndoor == null) {
            this.isIndoor = false;
        }
    }

    // --- ゲッター / セッター ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Boolean getIsIndoor() { return isIndoor; }

    // ★ どんな型のオブジェクトが渡されても Boolean に安全変換する汎用 Setter
    public void setIsIndoor(Object indoor) {
        if (indoor instanceof Boolean) {
            this.isIndoor = (Boolean) indoor;
        } else if (indoor instanceof String) {
            this.isIndoor = Boolean.parseBoolean((String) indoor);
        } else {
            this.isIndoor = false;
        }
    }

    // ★ Jackson 用の別名 Setter
    @JsonProperty("indoor")
    public void setIndoor(Object indoor) {
        setIsIndoor(indoor);
    }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public Integer getPricePerHour() { return pricePerHour; }
    public void setPricePerHour(Integer pricePerHour) { this.pricePerHour = pricePerHour; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getIsDeleted() { return isDeleted; }
    public void setIsDeleted(Boolean deleted) { this.isDeleted = (deleted != null) ? deleted : false; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}