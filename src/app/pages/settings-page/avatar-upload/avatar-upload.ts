import {Component, signal} from '@angular/core';
import {SvgIcon} from '../../../common-ui/svg-icon/svg-icon';
import {Dnd} from '../../../common-ui/directives/dnd';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  imports: [
    SvgIcon,
    Dnd,
    FormsModule
  ],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss'
})
export class AvatarUpload {
  preview = signal<string>('/assets/images/avatar-placeholder.png')

  avatar: File | null = null


  fileBrowserHandler(e: Event) {
     const file = (e.target as HTMLInputElement).files?.[0]

    this.processFile(file)
  }

  onFileDropped(file: File) {
    this.processFile(file)
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return

    const reader = new FileReader()
    reader.onload = e => {
      this.preview.set(e.target?.result?.toString() ?? '')
    }

    reader.readAsDataURL(file)
    this.avatar = file
  }
}
